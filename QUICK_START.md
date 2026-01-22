# 🚀 Quick Start Guide - Enhanced Features

## Cara Menjalankan Aplikasi

### 1. Navigate ke folder project
```powershell
cd cloth-brand\cloth-brand
```

### 2. Jalankan development server
```powershell
npm run dev
```

### 3. Buka browser
Aplikasi akan berjalan di: `http://localhost:5173`

## 🎯 Fitur Baru yang Bisa Dicoba

### ⭐ Product Reviews & Ratings
1. Buka halaman **Products** (`/products`)
2. Lihat rating bintang di setiap produk card
3. Klik **View Detail** pada produk
4. Scroll ke bawah untuk melihat **Customer Reviews**
5. Klik **Write a Review** untuk menambah review baru
6. Isi form (nama, rating, komentar) dan submit

### 📏 Size Guide & Selector
1. Di halaman **Product Detail**
2. Lihat section **Size** dengan pilihan ukuran
3. Klik **Size Guide** untuk melihat tabel ukuran lengkap
4. Pilih size yang diinginkan (akan highlight hitam)
5. Coba add to cart tanpa pilih size → akan muncul warning

### 🎨 Color Variants
1. Di halaman **Product Detail**
2. Lihat section **Color** dengan color circles
3. Klik warna yang diinginkan (akan ada border hitam)
4. Setiap warna memiliki stock berbeda
5. Coba add to cart tanpa pilih warna → akan muncul warning

### 🖼️ Image Gallery
1. Di halaman **Product Detail**
2. Lihat gambar utama produk
3. Di bawahnya ada thumbnail images
4. Klik thumbnail untuk ganti gambar utama
5. Thumbnail yang aktif akan memiliki border hitam

### 💡 Product Recommendations
1. Di halaman **Product Detail**
2. Scroll ke bawah setelah reviews
3. Lihat section **You May Also Like**
4. Menampilkan 4 produk serupa dari kategori yang sama
5. Klik produk untuk lihat detailnya

### 👁️ Recently Viewed
1. Buka beberapa produk berbeda
2. Di halaman **Product Detail**
3. Scroll ke bawah setelah recommendations
4. Lihat section **Recently Viewed**
5. Menampilkan produk yang baru saja dilihat (max 10)

### 📧 Stock Notification
1. Cari produk dengan stock = 0 (atau edit di `products.js`)
2. Buka product detail
3. Lihat form **Notify Me When Available**
4. Masukkan email
5. Klik **Notify Me**
6. Email akan disimpan (cek localStorage)

## 🧪 Testing Scenarios

### Scenario 1: Complete Purchase Flow
1. Browse products → Pilih produk
2. Pilih size & color
3. Set quantity
4. Add to cart
5. View cart
6. Proceed to checkout
7. Fill form & complete order

### Scenario 2: Review System
1. Buka produk
2. Baca existing reviews
3. Write new review dengan rating 5 bintang
4. Submit review
5. Lihat review baru muncul di list

### Scenario 3: Out of Stock
1. Edit `products.js` → set stock = 0 untuk satu produk
2. Buka produk tersebut
3. Lihat stock notification form
4. Submit email untuk notifikasi
5. Cek localStorage untuk verify data tersimpan

## 📱 Responsive Testing

Aplikasi sudah responsive, coba:
1. Resize browser window
2. Buka di mobile device
3. Test hamburger menu di navbar
4. Test product grid layout
5. Test modal (size guide, checkout)

## 🔍 Data Location

### LocalStorage Keys:
- `cart` - Shopping cart items
- `wishlist` - Wishlist items (ready to use)
- `recentlyViewed` - Recently viewed products
- `stockNotifications` - Email notifications

### Check LocalStorage:
1. Buka DevTools (F12)
2. Tab **Application** → **Local Storage**
3. Pilih `http://localhost:5173`
4. Lihat semua data yang tersimpan

## 🎨 Customization

### Menambah Produk Baru
Edit `src/data/products.js`:
```javascript
{
  id: 7,
  name: "New Product",
  price: 299000,
  image: "main-image-url",
  images: ["url1", "url2", "url3"],
  description: "Description",
  category: "tops",
  stock: 20,
  sizes: ["S", "M", "L", "XL"],
  colors: [
    { name: "Black", hex: "#000000", stock: 10 },
    { name: "White", hex: "#FFFFFF", stock: 10 }
  ],
  rating: 4.5,
  reviewCount: 15,
  reviews: []
}
```

### Mengubah Warna Theme
Edit inline styles di komponen atau buat CSS variables

### Menambah Kategori
Edit `src/data/products.js`:
```javascript
export const categories = [
  { id: "all", name: "All Products" },
  { id: "new-category", name: "New Category" }
];
```

## 🐛 Troubleshooting

### Port sudah digunakan?
```powershell
# Kill process di port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module not found?
```powershell
npm install
```

### Build error?
```powershell
npm run build
```

### Clear cache?
```powershell
# Delete node_modules dan reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

## 📚 Documentation

- `ENHANCED_FEATURES.md` - Detail fitur dan cara penggunaan
- `IMPLEMENTATION_SUMMARY.md` - Summary implementasi
- `README.md` - Vite + React documentation

## 🎉 Selamat Mencoba!

Semua fitur sudah siap digunakan. Jika ada pertanyaan atau butuh bantuan, silakan tanya! 🚀
