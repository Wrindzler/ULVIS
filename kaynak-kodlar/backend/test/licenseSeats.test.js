const test = require('node:test');
const assert = require('node:assert/strict');
const Database = require('better-sqlite3');

const allocationsRoute = require('../routes/allocations');

function createDb() {
  const db = new Database(':memory:');
  db.exec(`
    CREATE TABLE yazilim_lisanslari (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      yazilim_adi TEXT NOT NULL,
      durum TEXT NOT NULL,
      koltuk_sayisi INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE zimmetler (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kullanici_id INTEGER NOT NULL,
      varlik_tipi TEXT NOT NULL,
      varlik_id INTEGER NOT NULL,
      onay_durumu TEXT NOT NULL,
      iade_tarihi TEXT
    );
  `);
  return db;
}

test('getLicenseSeatUsage counts approved and pending active allocations', () => {
  const db = createDb();
  db.prepare(`
    INSERT INTO yazilim_lisanslari (id, yazilim_adi, durum, koltuk_sayisi)
    VALUES (1, 'Shared App', 'Aktif', 3)
  `).run();
  db.prepare(`
    INSERT INTO zimmetler (kullanici_id, varlik_tipi, varlik_id, onay_durumu, iade_tarihi)
    VALUES
      (1, 'Yazılım', 1, 'Onaylandı', NULL),
      (2, 'Yazılım', 1, 'Onay Bekliyor', NULL),
      (3, 'Yazılım', 1, 'İade Edildi', date('now'))
  `).run();

  assert.deepEqual(allocationsRoute.getLicenseSeatUsage(db, 1), {
    capacity: 3,
    used: 2,
    remaining: 1,
  });
  db.close();
});

test('validateLicenseAssignment rejects assignment when license capacity is full', () => {
  const db = createDb();
  db.prepare(`
    INSERT INTO yazilim_lisanslari (id, yazilim_adi, durum, koltuk_sayisi)
    VALUES (1, 'Single Seat App', 'Aktif', 1)
  `).run();
  db.prepare(`
    INSERT INTO zimmetler (kullanici_id, varlik_tipi, varlik_id, onay_durumu, iade_tarihi)
    VALUES (1, 'Yazılım', 1, 'Onaylandı', NULL)
  `).run();

  const result = allocationsRoute.validateLicenseAssignment(db, 1, 2);

  assert.equal(result.ok, false);
  assert.match(result.error, /boş lisans hakkı kalmamıştır/);
  db.close();
});

test('validateLicenseAssignment rejects duplicate assignment for the same user', () => {
  const db = createDb();
  db.prepare(`
    INSERT INTO yazilim_lisanslari (id, yazilim_adi, durum, koltuk_sayisi)
    VALUES (1, 'Shared App', 'Aktif', 10)
  `).run();
  db.prepare(`
    INSERT INTO zimmetler (kullanici_id, varlik_tipi, varlik_id, onay_durumu, iade_tarihi)
    VALUES (1, 'Yazılım', 1, 'Onay Bekliyor', NULL)
  `).run();

  const result = allocationsRoute.validateLicenseAssignment(db, 1, 1);

  assert.equal(result.ok, false);
  assert.match(result.error, /aynı lisans zaten atanmış/);
  db.close();
});

test('validateLicenseAssignment allows assignment when an active license has remaining seats', () => {
  const db = createDb();
  db.prepare(`
    INSERT INTO yazilim_lisanslari (id, yazilim_adi, durum, koltuk_sayisi)
    VALUES (1, 'Shared App', 'Aktif', 10)
  `).run();
  db.prepare(`
    INSERT INTO zimmetler (kullanici_id, varlik_tipi, varlik_id, onay_durumu, iade_tarihi)
    VALUES (1, 'Yazılım', 1, 'Onaylandı', NULL)
  `).run();

  const result = allocationsRoute.validateLicenseAssignment(db, 1, 2);

  assert.equal(result.ok, true);
  assert.equal(result.usage.remaining, 9);
  db.close();
});
