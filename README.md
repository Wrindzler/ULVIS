<h1 align="center">ULVİS</h1>

<p align="center">
  <strong>Kurumsal Lisans ve Varlık İzleme Sistemi</strong><br>
  <i>Donanım, yazılım lisansı, zimmet, arıza, satınalma ve denetim süreçleri için rol tabanlı full-stack platform.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Auth-JWT%20%2B%20RBAC-success?style=flat-square" alt="JWT RBAC">
  <img src="https://img.shields.io/badge/Tests-Node%20Test-informational?style=flat-square" alt="Node Test">
  <img src="https://img.shields.io/badge/Status-Academic%20Final-blueviolet?style=flat-square" alt="Academic Final">
  <img src="https://img.shields.io/badge/License-Educational-lightgrey?style=flat-square" alt="Educational">
</p>

---

## İçindekiler

- [Proje Açıklaması](#proje-açıklaması)
- [Projenin Amacı](#projenin-amacı)
- [Özellikler](#özellikler)
- [Son Geliştirmeler](#son-geliştirmeler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Klasör Yapısı](#klasör-yapısı)
- [Kurulum](#kurulum)
- [Çalıştırma](#çalıştırma)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [Örnek Hesaplar](#örnek-hesaplar)
- [Test ve Doğrulama](#test-ve-doğrulama)
- [Ekran Görüntüleri](#ekran-görüntüleri)
- [Geliştirme Önerileri](#geliştirme-önerileri)
- [Katkıda Bulunanlar](#katkıda-bulunanlar)

---

## Proje Açıklaması

ULVİS, üniversite ve kurum içi IT operasyonlarında kullanılan donanım varlıklarının, yazılım lisanslarının, zimmet süreçlerinin, arıza kayıtlarının, satınalma bilgilerinin ve yönetimsel denetim kayıtlarının merkezi olarak yönetilmesini sağlayan web tabanlı bir bilgi sistemidir.

Sistem; manuel takip, dağınık tablo dosyaları ve kişiye bağlı operasyon süreçleri yerine, tüm işlemlerin kayıt altına alındığı, rol bazlı erişimle korunduğu ve yöneticiler tarafından izlenebildiği bütünleşik bir platform sunar.

## Projenin Amacı

Projenin temel amacı, IT varlık ve lisans yönetimini daha güvenli, izlenebilir, düzenli ve sürdürülebilir hale getirmektir. Bu kapsamda sistem:

- Donanım ve yazılım lisanslarını merkezi envanterde toplar.
- Personel, IT destek, satınalma ve IT müdürü rollerini ayrı yetkilerle yönetir.
- Zimmet, iade, arıza ve lisans yenileme süreçlerini standart kurallara bağlar.
- Lisans bitiş tarihleri için otomatik bildirimler üretir.
- Kritik işlemleri loglayarak denetlenebilirlik sağlar.
- Dashboard ekranlarıyla operasyonel görünürlük sağlar.

## Özellikler

| Alan | Açıklama |
| --- | --- |
| Kimlik doğrulama | JWT tabanlı giriş, bcrypt parola hashleme, parola politikası ve zorunlu parola değiştirme |
| Yetkilendirme | IT Müdürü, IT Destek, Satınalma ve Personel rolleri için API ve arayüz kısıtları |
| Donanım yönetimi | Donanım ekleme, güncelleme, durum takibi, zimmet ve iade yönetimi |
| Lisans yönetimi | Lisans ekleme, güncelleme, bitiş tarihi takibi, kişi limiti ve koltuk kapasitesi kontrolü |
| Zimmet yönetimi | Donanım ve yazılım lisansı atama, onay, red ve iade işlemleri |
| Arıza yönetimi | Personel arıza bildirimi, IT destek durum güncellemesi ve süreç takibi |
| Satınalma | Tedarikçi ve fatura kayıtlarının yönetimi |
| Bildirimler | Lisans bitişine 30, 15 ve 7 gün kala uygulama içi bildirim üretimi |
| Denetim | İşlem logları ve yönetimsel izlenebilirlik |
| Raporlama | Dashboard metrikleri, lisans maliyeti, departman dağılımları ve özet kartlar |

## Son Geliştirmeler

Bu sürümde proje, teslim kriterlerine daha uygun ve daha düzenli bir yapıya kavuşturulmuştur:

- Kök dizine backend ve frontend'i birlikte çalıştıran `npm run dev:full` komutu eklenmiştir.
- `README.md`, kurulum, çalıştırma, test, ekran görüntüleri ve katkı bölümleriyle daha düzenli hale getirilmiştir.
- `.gitignore` dosyası `node_modules`, build çıktıları, `.env` dosyaları ve SQLite veritabanı dosyalarını dışlayacak şekilde genişletilmiştir.
- Lisanslara kişi limiti ve koltuk kapasitesi eklenmiştir.
- Lisans kapasitesi dolduğunda yeni atama yapılması engellenmiştir.
- Donanım durumu değiştiğinde aktif zimmet kaydı otomatik olarak kapatılacak şekilde iş kuralı eklenmiştir.
- Backend testleri ve frontend build doğrulaması yapılmıştır.

## Kullanılan Teknolojiler

| Katman | Teknolojiler |
| --- | --- |
| Backend | Node.js, Express.js, better-sqlite3, JWT, bcryptjs, node-cron, Nodemailer |
| Frontend | React 18, Vite 5, Tailwind CSS, React Router, Axios, Recharts, react-hot-toast |
| Veritabanı | SQLite |
| Test | Node.js built-in test runner |
| Paket yönetimi | npm |
| Dokümantasyon | Markdown |

## Klasör Yapısı

```text
ULVIS/
|-- kaynak-kodlar/
|   |-- backend/
|   |   |-- config/             # Veritabanı bağlantısı ve şema işlemleri
|   |   |-- middleware/         # Kimlik doğrulama, rol kontrolü ve denetim yapıları
|   |   |-- routes/             # REST API uçları
|   |   |-- services/           # Bildirim, e-posta ve audit servisleri
|   |   |-- test/               # Backend test dosyaları
|   |   |-- seed.js             # Örnek veri yükleme
|   |   `-- server.js           # Express uygulaması
|   `-- frontend/
|       |-- public/             # Statik dosyalar
|       `-- src/
|           |-- components/     # Ortak arayüz bileşenleri
|           |-- context/        # Kimlik ve oturum context yapısı
|           |-- pages/          # Sayfa bileşenleri
|           |-- routes/         # Uygulama rota yapısı
|           `-- services/       # Axios API istemcisi
|-- dokumantasyon/              # Ek proje notları ve teslim içeriği için ayrılan klasör
|-- gorseller/
|   |-- screenshots/            # README ve teslim için ekran görüntüleri
|   `-- logo.png
|-- scripts/
|   `-- dev-full.js             # Backend ve frontend ortak geliştirme başlatıcısı
|-- .gitignore
|-- package.json                # Kök npm komutları
`-- README.md
```

## Kurulum

### Gereksinimler

- Node.js 18 veya üzeri
- npm
- Git

### Depoyu klonlama

```bash
git clone https://github.com/Wrindzler/gordon.git
cd gordon
```

### Tüm bağımlılıkları kurma

Kök dizinden tek komutla backend ve frontend bağımlılıkları kurulabilir:

```bash
npm run install:all
```

İsterseniz bağımlılıkları ayrı ayrı da kurabilirsiniz:

```bash
cd kaynak-kodlar/backend
npm install

cd ../frontend
npm install
```

## Çalıştırma

### Tek komutla geliştirme modu

Kök dizinden aşağıdaki komut çalıştırılır:

```bash
npm run dev:full
```

Bu komut:

- Backend bağımlılıkları eksikse kurar.
- Frontend bağımlılıkları eksikse kurar.
- Backend API sunucusunu `http://localhost:5000` adresinde başlatır.
- Frontend Vite sunucusunu `http://localhost:3000` adresinde başlatır.
- Terminal çıktısını `[backend]` ve `[frontend]` etiketleriyle ayırır.

### Ayrı çalıştırma

Backend:

```bash
cd kaynak-kodlar/backend
npm run dev
```

Frontend:

```bash
cd kaynak-kodlar/frontend
npm run dev
```

### Veritabanı seed işlemi

Geliştirme ortamında örnek kullanıcı ve örnek veri oluşturmak için:

```bash
cd kaynak-kodlar/backend
npm run seed
```

> `npm run seed` mevcut geliştirme veritabanını sıfırlayabilir. Üretim ortamında dikkatli kullanılmalıdır.

## Ortam Değişkenleri

Backend için `kaynak-kodlar/backend/.env.example` dosyası `.env` adıyla kopyalanabilir.

```env
PORT=5000
JWT_SECRET=gelistirme-icin-uzun-bir-anahtar-yazin
DB_PATH=./database.sqlite
APP_URL=http://localhost:3000
RESET_TOKEN_TTL_MINUTES=60

# SMTP opsiyoneldir. Tum alanlar dolu degilse e-posta gonderimi atlanir.
# SMTP_HOST=
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=
# SMTP_PASS=
# SMTP_FROM="ULVIS <no-reply@ornek.com>"
```

> `.env` dosyası GitHub'a yüklenmemelidir. Bu dosya `.gitignore` ile hariç tutulur.

## Örnek Hesaplar

`npm run seed` sonrasında kullanılabilecek geliştirme hesapları:

| Rol | E-posta | Şifre |
| --- | --- | --- |
| IT Müdürü | `admin@ulvis.com.tr` | `admin123` |
| IT Destek | `itdestek@ulvis.com.tr` | `destek123` |
| Satınalma | `satinalma@ulvis.com.tr` | `satin123` |
| Personel | `ali.ozturk@ulvis.com.tr` | `personel123` |

> Bu hesaplar yalnızca yerel geliştirme ve test amacıyla kullanılmalıdır.

## Test ve Doğrulama

Kök dizinden aşağıdaki doğrulamalar çalıştırılabilir:

```bash
npm run test
npm run build
npm run audit:high
```

Bu komutlarla backend testleri, frontend build çıktısı ve güvenlik denetimi ayrı ayrı doğrulanabilir.

## Ekran Görüntüleri

Ekran görüntüleri `gorseller/screenshots/` klasöründe tutulur. README içinde kullanılacak dosya adları kısa ve açıklayıcı olmalıdır:

```text
gorseller/screenshots/login.png
gorseller/screenshots/dashboard.png
gorseller/screenshots/licenses.png
gorseller/screenshots/allocations.png
gorseller/screenshots/hardware.png
```

Örnek kullanım:

```markdown
![ULVİS Login](gorseller/screenshots/login.png)
```

> Teslim öncesinde ekran görüntülerinde kişisel veri veya gerçek parola bulunmamasına dikkat edilmelidir.

GitHub tesliminde depoda bulunması beklenen ana dosya ve klasörler:

- `kaynak-kodlar/`
- `README.md`
- `.gitignore`
- `package.json`
- `dokumantasyon/` (varsa ek notlar için)
- `gorseller/screenshots/`
- Backend ve frontend `package.json` dosyaları
- Test dosyaları

## Geliştirme Önerileri

Gelecekte yapılabilecek geliştirmeler:

- Docker tabanlı kurulum dosyalarının eklenmesi
- GitHub Actions ile otomatik test ve build hattı kurulması
- Daha kapsamlı frontend testlerinin eklenmesi
- Rol ve izin yönetiminin daha ayrıntılı hale getirilmesi
- Demo verisinin ve ekran görüntülerinin standartlaştırılması

## Katkıda Bulunanlar

| Ekip Üyesi | Sorumluluk |
| --- | --- |
| Emre Berk Güç | Backend liderliği, API servisleri, kimlik doğrulama mimarisi |
| Kaan Emre Demir | Backend destek, bildirim servisleri, dağıtım ve test süreçleri |
| Beste Tuana Çuhadar | Raporlama, dokümantasyon, ER ve UML çalışmaları |
| Zeynep Zehra Kocatürk | Frontend liderliği, arayüz geliştirme, UI/UX akışları |
| Selim İşkodra | Frontend destek, entegrasyon ve kullanıcı testleri |

## Lisans

Bu proje akademik ve eğitim amaçlı geliştirilmiştir.

Kocaeli Sağlık ve Teknoloji Üniversitesi  
Mühendislik ve Doğa Bilimleri Fakültesi  
Yazılım Mühendisliği Bölümü

---

<p align="center">
  <strong>ULVİS</strong><br>
  Kurumsal Lisans ve Varlık İzleme Sistemi
</p>
