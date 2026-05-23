const test = require('node:test');
const assert = require('node:assert/strict');
const Database = require('better-sqlite3');

const hardwareRoute = require('../routes/hardware');

test('shouldReleaseHardwareAllocation releases active allocation when in-use hardware becomes available', () => {
  assert.equal(
    hardwareRoute.shouldReleaseHardwareAllocation('Kullanımda', 'Müsait'),
    true
  );
});

test('shouldReleaseHardwareAllocation releases active allocation when in-use hardware becomes faulty', () => {
  assert.equal(
    hardwareRoute.shouldReleaseHardwareAllocation('Kullanımda', 'Arızalı'),
    true
  );
});

test('shouldReleaseHardwareAllocation keeps allocation when hardware remains in use', () => {
  assert.equal(
    hardwareRoute.shouldReleaseHardwareAllocation('Kullanımda', 'Kullanımda'),
    false
  );
});

test('releaseActiveHardwareAllocations marks approved active hardware allocations as returned', () => {
  const db = new Database(':memory:');
  db.exec(`
    CREATE TABLE zimmetler (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kullanici_id INTEGER NOT NULL,
      varlik_tipi TEXT NOT NULL,
      varlik_id INTEGER NOT NULL,
      onay_durumu TEXT NOT NULL,
      iade_tarihi TEXT
    );
  `);

  db.prepare(`
    INSERT INTO zimmetler (kullanici_id, varlik_tipi, varlik_id, onay_durumu, iade_tarihi)
    VALUES (1, 'Donanım', 42, 'Onaylandı', NULL)
  `).run();
  db.prepare(`
    INSERT INTO zimmetler (kullanici_id, varlik_tipi, varlik_id, onay_durumu, iade_tarihi)
    VALUES (2, 'Donanım', 42, 'Onay Bekliyor', NULL)
  `).run();

  const changes = hardwareRoute.releaseActiveHardwareAllocations(db, 42);
  const rows = db.prepare('SELECT onay_durumu, iade_tarihi FROM zimmetler ORDER BY id').all();

  assert.equal(changes, 1);
  assert.equal(rows[0].onay_durumu, 'İade Edildi');
  assert.match(rows[0].iade_tarihi, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(rows[1].onay_durumu, 'Onay Bekliyor');
  assert.equal(rows[1].iade_tarihi, null);
  db.close();
});
