/**
 * Zimmet: personel sadece kendi kayıtlarını görür; IT tam liste ve
 * onay/red/iade uçlarını yürütür, donanım durumu güncellenir.
 */
const express = require('express');
const { db } = require('../config/db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

function getLicenseSeatUsage(database, licenseId) {
  const license = database.prepare(`
    SELECT koltuk_sayisi FROM yazilim_lisanslari WHERE id = ?
  `).get(licenseId);

  const capacity = Math.max(1, Number(license?.koltuk_sayisi || 1));
  const used = database.prepare(`
    SELECT COUNT(*) AS count
    FROM zimmetler
    WHERE varlik_tipi = 'Yazılım'
      AND varlik_id = ?
      AND onay_durumu IN ('Onay Bekliyor', 'Onaylandı')
      AND iade_tarihi IS NULL
  `).get(licenseId).count;

  return {
    capacity,
    used,
    remaining: Math.max(0, capacity - used),
  };
}

function validateLicenseAssignment(database, licenseId, userId) {
  const lic = database.prepare('SELECT * FROM yazilim_lisanslari WHERE id = ?').get(licenseId);
  if (!lic) {
    return { ok: false, status: 404, error: 'Lisans bulunamadı.' };
  }
  if (lic.durum !== 'Aktif') {
    return { ok: false, status: 400, error: 'Süresi dolmuş veya pasif lisans atanamaz.' };
  }

  const duplicate = database.prepare(`
    SELECT id FROM zimmetler
    WHERE kullanici_id = ?
      AND varlik_tipi = 'Yazılım'
      AND varlik_id = ?
      AND onay_durumu IN ('Onay Bekliyor', 'Onaylandı')
      AND iade_tarihi IS NULL
    LIMIT 1
  `).get(userId, licenseId);

  if (duplicate) {
    return { ok: false, status: 400, error: 'Bu kullanıcıya aynı lisans zaten atanmış.' };
  }

  const usage = getLicenseSeatUsage(database, licenseId);
  if (usage.remaining <= 0) {
    return { ok: false, status: 400, error: 'Bu lisans için boş lisans hakkı kalmamıştır.', usage };
  }

  return { ok: true, usage };
}

router.get('/', authenticateToken, (req, res) => {
  try {
    let query;
    const params = [];

    if (req.user.rol_adi === 'Personel') {
      query = `
        SELECT z.*, k.ad, k.soyad, k.email,
          CASE 
            WHEN z.varlik_tipi = 'Donanım' THEN (SELECT marka || ' ' || model FROM donanimlar WHERE id = z.varlik_id)
            WHEN z.varlik_tipi = 'Yazılım' THEN (SELECT yazilim_adi FROM yazilim_lisanslari WHERE id = z.varlik_id)
          END as varlik_adi
        FROM zimmetler z
        JOIN kullanicilar k ON z.kullanici_id = k.id
        WHERE z.kullanici_id = ?
        ORDER BY z.created_at DESC
      `;
      params.push(req.user.id);
    } else {
      query = `
        SELECT z.*, k.ad, k.soyad, k.email,
          CASE 
            WHEN z.varlik_tipi = 'Donanım' THEN (SELECT marka || ' ' || model FROM donanimlar WHERE id = z.varlik_id)
            WHEN z.varlik_tipi = 'Yazılım' THEN (SELECT yazilim_adi FROM yazilim_lisanslari WHERE id = z.varlik_id)
          END as varlik_adi
        FROM zimmetler z
        JOIN kullanicilar k ON z.kullanici_id = k.id
        ORDER BY z.created_at DESC
      `;
    }

    const allocations = db.prepare(query).all(...params);
    res.json(allocations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticateToken, authorizeRoles('IT Destek', 'IT Müdürü'), (req, res) => {
  try {
    const { kullanici_id, varlik_tipi, varlik_id } = req.body;

    if (!kullanici_id || !varlik_tipi || !varlik_id) {
      return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
    }

    // IK-1: Arızalı veya Kullanımda donanım atanamaz
    if (varlik_tipi === 'Donanım') {
      const hw = db.prepare('SELECT * FROM donanimlar WHERE id = ?').get(varlik_id);
      if (!hw) return res.status(404).json({ error: 'Donanım bulunamadı.' });
      if (hw.durum !== 'Müsait') {
        return res.status(400).json({ error: `Durumu "${hw.durum}" olan donanım atanamaz. Sadece "Müsait" donanımlar atanabilir.` });
      }
    }

    // IK-2: Süresi dolmuş lisans atanamaz
    if (varlik_tipi === 'Yazılım') {
      const validation = validateLicenseAssignment(db, varlik_id, kullanici_id);
      if (!validation.ok) {
        return res.status(validation.status).json({ error: validation.error });
      }
    }

    const result = db.prepare(`
      INSERT INTO zimmetler (kullanici_id, varlik_tipi, varlik_id)
      VALUES (?, ?, ?)
    `).run(kullanici_id, varlik_tipi, varlik_id);

    // Donanım durumunu güncelle (henüz onay bekliyor ama reserve et)
    if (varlik_tipi === 'Donanım') {
      db.prepare("UPDATE donanimlar SET durum = 'Kullanımda' WHERE id = ?").run(varlik_id);
    }

    // Kullanıcıya bildirim gönder
    db.prepare(`
      INSERT INTO bildirimler (kullanici_id, baslik, mesaj)
      VALUES (?, 'Zimmet Onay Talebi', 'Size yeni bir varlık zimmetlenmek isteniyor. Lütfen onaylayın veya reddedin.')
    `).run(kullanici_id);

    res.status(201).json({ id: result.lastInsertRowid, message: 'Zimmet talebi oluşturuldu.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Personel onay/red
router.put('/:id/onayla', authenticateToken, (req, res) => {
  try {
    const allocation = db.prepare('SELECT * FROM zimmetler WHERE id = ?').get(req.params.id);
    if (!allocation) return res.status(404).json({ error: 'Zimmet kaydı bulunamadı.' });

    if (allocation.kullanici_id !== req.user.id && req.user.rol_adi === 'Personel') {
      return res.status(403).json({ error: 'Sadece kendi zimmet taleplerinizi onaylayabilirsiniz.' });
    }

    db.prepare("UPDATE zimmetler SET onay_durumu = 'Onaylandı' WHERE id = ?").run(req.params.id);
    res.json({ message: 'Zimmet onaylandı.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/reddet', authenticateToken, (req, res) => {
  try {
    const allocation = db.prepare('SELECT * FROM zimmetler WHERE id = ?').get(req.params.id);
    if (!allocation) return res.status(404).json({ error: 'Zimmet kaydı bulunamadı.' });

    db.prepare("UPDATE zimmetler SET onay_durumu = 'Reddedildi' WHERE id = ?").run(req.params.id);

    if (allocation.varlik_tipi === 'Donanım') {
      db.prepare("UPDATE donanimlar SET durum = 'Müsait' WHERE id = ?").run(allocation.varlik_id);
    }

    res.json({ message: 'Zimmet reddedildi.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// IK-3: İade süreci - önce depoya iade
router.put('/:id/iade', authenticateToken, (req, res) => {
  try {
    const allocation = db.prepare('SELECT * FROM zimmetler WHERE id = ?').get(req.params.id);
    if (!allocation) return res.status(404).json({ error: 'Zimmet kaydı bulunamadı.' });

    if (allocation.onay_durumu === 'İade Edildi') {
      return res.status(400).json({ error: 'Bu zimmet zaten iade edilmiş.' });
    }

    db.prepare(`
      UPDATE zimmetler SET onay_durumu = 'İade Edildi', iade_tarihi = date('now') WHERE id = ?
    `).run(req.params.id);

    if (allocation.varlik_tipi === 'Donanım') {
      db.prepare("UPDATE donanimlar SET durum = 'Müsait' WHERE id = ?").run(allocation.varlik_id);
    }

    res.json({ message: 'Varlık başarıyla iade edildi.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.getLicenseSeatUsage = getLicenseSeatUsage;
router.validateLicenseAssignment = validateLicenseAssignment;

module.exports = router;
