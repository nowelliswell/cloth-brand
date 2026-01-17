const products = [
  {
    id: 1,
    name: "Oversize T-Shirt",
    price: 199000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500&h=500&fit=crop"
    ],
    description: "Premium cotton oversize t-shirt with comfortable fit. Perfect for casual daily wear with modern streetwear style.",
    category: "tops",
    stock: 15,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000", stock: 5 },
      { name: "White", hex: "#FFFFFF", stock: 6 },
      { name: "Gray", hex: "#808080", stock: 4 }
    ],
    rating: 4.5,
    reviewCount: 28,
    reviews: [
      { id: 1, user: "Budi Santoso", rating: 5, comment: "Kualitas bagus, bahannya adem dan nyaman dipakai!", date: "2026-01-10" },
      { id: 2, user: "Siti Nurhaliza", rating: 4, comment: "Ukurannya pas, tapi warnanya sedikit berbeda dari foto", date: "2026-01-08" },
      { id: 3, user: "Ahmad Rizki", rating: 5, comment: "Sangat puas! Pengiriman cepat dan produk sesuai ekspektasi", date: "2026-01-05" }
    ]
  },
  {
    id: 2,
    name: "Hoodie Black",
    price: 349000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop"
    ],
    description: "Warm hoodie for daily style. Made from high-quality fleece material, perfect for cold weather.",
    category: "tops",
    stock: 10,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000", stock: 4 },
      { name: "Navy", hex: "#000080", stock: 3 },
      { name: "Maroon", hex: "#800000", stock: 3 }
    ],
    rating: 4.8,
    reviewCount: 45,
    reviews: [
      { id: 1, user: "Dimas Prakoso", rating: 5, comment: "Hoodie terbaik yang pernah saya beli! Hangat dan stylish", date: "2026-01-12" },
      { id: 2, user: "Rina Wijaya", rating: 5, comment: "Material premium, jahitan rapi. Recommended!", date: "2026-01-09" },
      { id: 3, user: "Fajar Ramadhan", rating: 4, comment: "Bagus tapi agak kebesaran, mungkin perlu size chart lebih detail", date: "2026-01-07" }
    ]
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: 450000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1543076659-9380cdf10613?w=500&h=500&fit=crop"
    ],
    description: "Classic denim jacket with modern cut. Versatile piece that goes with any outfit.",
    category: "outerwear",
    stock: 8,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Light Blue", hex: "#ADD8E6", stock: 3 },
      { name: "Dark Blue", hex: "#00008B", stock: 3 },
      { name: "Black", hex: "#000000", stock: 2 }
    ],
    rating: 4.6,
    reviewCount: 32,
    reviews: [
      { id: 1, user: "Andi Wijaya", rating: 5, comment: "Jaket denim berkualitas tinggi, worth the price!", date: "2026-01-11" },
      { id: 2, user: "Maya Sari", rating: 4, comment: "Bagus tapi agak kaku di awal, perlu beberapa kali pakai", date: "2026-01-06" }
    ]
  },
  {
    id: 4,
    name: "Cargo Pants",
    price: 299000,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=500&fit=crop"
    ],
    description: "Comfortable cargo pants with multiple pockets. Perfect for urban exploration and outdoor activities.",
    category: "bottoms",
    stock: 12,
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Khaki", hex: "#C3B091", stock: 4 },
      { name: "Black", hex: "#000000", stock: 5 },
      { name: "Olive", hex: "#808000", stock: 3 }
    ],
    rating: 4.7,
    reviewCount: 38,
    reviews: [
      { id: 1, user: "Rudi Hartono", rating: 5, comment: "Celana cargo terbaik! Banyak kantong dan nyaman", date: "2026-01-13" },
      { id: 2, user: "Dewi Lestari", rating: 5, comment: "Bahan tebal tapi tetap breathable, suka banget!", date: "2026-01-10" },
      { id: 3, user: "Hendra Kusuma", rating: 4, comment: "Bagus, tapi ukuran sedikit besar dari biasanya", date: "2026-01-04" }
    ]
  },
  {
    id: 5,
    name: "White Sneakers",
    price: 399000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop"
    ],
    description: "Classic white sneakers that match any outfit. Comfortable for all-day wear.",
    category: "footwear",
    stock: 20,
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "White", hex: "#FFFFFF", stock: 10 },
      { name: "Off-White", hex: "#F5F5DC", stock: 6 },
      { name: "Cream", hex: "#FFFDD0", stock: 4 }
    ],
    rating: 4.9,
    reviewCount: 67,
    reviews: [
      { id: 1, user: "Yoga Pratama", rating: 5, comment: "Sepatu putih paling nyaman yang pernah saya pakai!", date: "2026-01-14" },
      { id: 2, user: "Linda Kusuma", rating: 5, comment: "Kualitas premium, empuk dan ringan", date: "2026-01-12" },
      { id: 3, user: "Bayu Setiawan", rating: 5, comment: "Perfect! Cocok untuk segala acara", date: "2026-01-09" }
    ]
  },
  {
    id: 6,
    name: "Leather Jacket",
    price: 899000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&h=500&fit=crop"
    ],
    description: "Premium leather jacket with timeless design. Perfect for adding edge to your style.",
    category: "outerwear",
    stock: 5,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000", stock: 3 },
      { name: "Brown", hex: "#8B4513", stock: 2 }
    ],
    rating: 4.9,
    reviewCount: 23,
    reviews: [
      { id: 1, user: "Arief Budiman", rating: 5, comment: "Jaket kulit asli dengan kualitas luar biasa!", date: "2026-01-15" },
      { id: 2, user: "Sinta Dewi", rating: 5, comment: "Mewah dan berkelas, sangat puas dengan pembelian ini", date: "2026-01-11" },
      { id: 3, user: "Rizal Fauzi", rating: 4, comment: "Bagus tapi harganya cukup mahal, tapi worth it!", date: "2026-01-08" }
    ]
  },
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "tops", name: "Tops" },
  { id: "bottoms", name: "Bottoms" },
  { id: "outerwear", name: "Outerwear" },
  { id: "footwear", name: "Footwear" },
];

export default products;
