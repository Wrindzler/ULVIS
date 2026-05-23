const test = require('node:test');
const assert = require('node:assert/strict');

const licensesRoute = require('../routes/licenses');

test('resolveLicenseDurumAfterEdit reactivates renewed expired licenses', () => {
  const item = {
    bitis_tarihi: '2026-01-01',
    durum: 'Süresi Dolmuş',
  };
  const body = {
    bitis_tarihi: '2026-12-31',
  };

  assert.equal(
    licensesRoute.resolveLicenseDurumAfterEdit(item, body, '2026-05-20'),
    'Aktif'
  );
});

test('resolveLicenseDurumAfterEdit expires active licenses with past end date', () => {
  const item = {
    bitis_tarihi: '2026-12-31',
    durum: 'Aktif',
  };
  const body = {
    bitis_tarihi: '2026-01-01',
  };

  assert.equal(
    licensesRoute.resolveLicenseDurumAfterEdit(item, body, '2026-05-20'),
    'Süresi Dolmuş'
  );
});

test('resolveLicenseDurumAfterEdit keeps passive licenses passive', () => {
  const item = {
    bitis_tarihi: '2026-01-01',
    durum: 'Pasif',
  };

  assert.equal(
    licensesRoute.resolveLicenseDurumAfterEdit(item, {}, '2026-05-20'),
    'Pasif'
  );
});
