// API Service with seamless fallback
const API_BASE = '/api';

export const STORE_DATA = {
  name: 'Sri Manikanta Pooja Stores',
  phones: ['+91 91105 82086', '+91 98499 85423', '+91 91828 14818', '+91 90147 58196'],
  whatsapp: '919849985423',
  whatsapp2: '919110582086',
  whatsappGroup: 'https://chat.whatsapp.com/KoJUjAeLjgFDm00ZMESWnx',
  instagram: 'https://www.instagram.com/srimanikanta_poojastores?igsh=MWNqYmdxeGl1Nm9qdw==',
  address: 'Konark Theatre Ln, opp. Sanjay Super Market, Dilsukhnagar, Hyderabad – 500060',
  fullAddress: 'Sri Manikanta pooja stores, P&T coloney, dilsukhnagar., Konark Theatre Ln, opposite Sanjay Super Market, Dilsukhnagar, Hyderabad, Telangana 500060',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7615.796686244467!2d78.51863469196398!3d17.36862398406134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9992e24cfac1%3A0x84d6068085b897e0!2sSri%20manikanta%20pooja%20stores!5e0!3m2!1sen!2sin!4v1782628485698!5m2!1sen!2sin',
  mapLink: 'https://maps.app.goo.gl/y4TFYSYQsG3ZiySJ8',
  hours: {
    weekdays: '8:00 AM – 10:00 PM',
    saturday: '8:00 AM – 10:00 PM',
    sunday: '8:30 AM – 10:00 PM',
    festivals: '7:00 AM – 11:30 PM'
  }
};

export const FALLBACK_CATEGORIES = [
  { id: "agarbatti", name: "Agarbatti & Incense", telugu: "అగర్బత్తి", img: "/images/cat_agarbatti.webp", desc: "", emoji: "🕉️", count: 1 },
  { id: "camphor", name: "Camphor (Kapoor)", telugu: "కర్పూరం", img: "/images/cat_camphor.webp", desc: "", emoji: "✨", count: 0 },
  { id: "kumkum", name: "Kumkum & Haldi", telugu: "కుంకుమ పసుపు", img: "/images/cat_kumkum.webp", desc: "", emoji: "🔴", count: 0 },
  { id: "oils", name: "Pooja Oils & Ghee", telugu: "నూనె & నెయ్యి", img: "/images/cat_oils.webp", desc: "", emoji: "🪔", count: 0 },
  { id: "diyas", name: "Diyas & Lamps", telugu: "దీపాలు", img: "/images/cat_diyas.webp", desc: "", emoji: "🪔", count: 0 },
  { id: "photos", name: "God Photos & Frames", telugu: "దేవుడి ఫోటోలు", img: "/images/cat_photos.webp", desc: "", emoji: "🖼️", count: 2 },
  { id: "idols", name: "Idols (Vigrahas)", telugu: "విగ్రహాలు", img: "/images/cat_idols.webp", desc: "", emoji: "🗿", count: 0 },
  { id: "thali", name: "Puja Thali & Vessels", telugu: "పూజా పాత్రలు", img: "/images/cat_thali.webp", desc: "", emoji: "🍽️", count: 0 },
  { id: "malas", name: "Malas & Rosaries", telugu: "మాలలు", img: "/images/cat_malas.webp", desc: "", emoji: "📿", count: 1 },
  { id: "havan", name: "Havan Samagri", telugu: "హవన్ సామగ్రి", img: "/images/cat_havan.webp", desc: "", emoji: "🔥", count: 1 },
  { id: "festivals", name: "Festival Kits", telugu: "పండుగ కిట్లు", img: "/images/cat_festival.webp", desc: "", emoji: "🎉", count: 0 },
  { id: "wedding", name: "Wedding Items", telugu: "వివాహ సామగ్రి", img: "/images/cat_wedding.webp", desc: "", emoji: "💍", count: 1 },
  { id: "dhoop-sticks", name: "Dhoop Sticks", telugu: "", img: "/images/cat_dhoop.webp", desc: "", emoji: "🌸", count: 0 },
  { id: "more-and-other", name: "More and other", telugu: "", img: "/images/cat_other.webp", desc: "", emoji: "🌸", count: 0 }
];

export const FALLBACK_PRODUCTS = [
  {
    id: 5006,
    category: "agarbatti",
    categoryName: "Agarbatti & Incense",
    name: "Ambica Durbar Bathi Agarbathi",
    telugu: "అంబికా దుర్బార్ బత్తి అగరబత్తి",
    price: 110,
    originalPrice: 120,
    rating: 5,
    reviews: 12,
    image: "/uploads/products/prod_1782831283_6cd1e755.jpg",
    images: [
      "/uploads/products/prod_1782831283_6cd1e755.jpg",
      "/uploads/products/prod_1782830063_e7b929a4.jpg",
      "/uploads/products/prod_1782830068_82a0f0cd.jpg",
      "/uploads/products/prod_1782831350_d3ad8f73.jpg"
    ],
    description: "Ambica Durbar Bathi is a premium herbal agarbathi made from a blend of 63 natural herbs. Hand-rolled in India by ACP Industries Ltd., Eluru. It produces a pleasant, long-lasting fragrance suitable for daily pooja, meditation, spiritual practice, creating a peaceful atmosphere at home and temples.",
    sizes: [
      { name: "210g", price: 110, original_price: 120, stock: 100, image: "/uploads/products/prod_1782831283_6cd1e755.jpg" },
      { name: "75g", price: 60, original_price: 70, stock: 100, image: "/uploads/products/prod_1782830063_e7b929a4.jpg" },
      { name: "small", price: 25, original_price: 30, stock: 100, image: "/uploads/products/prod_1782830068_82a0f0cd.jpg" },
      { name: "145g", price: 90, original_price: 110, stock: 100, image: "/uploads/products/prod_1782831350_d3ad8f73.jpg" }
    ],
    tags: ["agarbatti", "ambica", "durbar", "herbal"],
    badge: "Best Seller",
    inStock: true,
    featured: true
  },
  {
    id: 39,
    category: "wedding",
    categoryName: "Wedding Items",
    name: "Zed Black 3-in-1 Premium Agarbatti",
    telugu: "వివాహ సామగ్రి కిట్",
    price: 60,
    originalPrice: 50,
    rating: 4.8,
    reviews: 18,
    image: "/images/1000090824.jpg",
    images: ["/images/1000090824.jpg"],
    description: "Complete Telugu Brahmin wedding puja kit. Includes: coconut, beetle leaves & nuts, mango leaves, sacred thread, turmeric pieces, bangles, sacred cloth, kankanam thread, akshat, and all ritual items as per Telugu Shastras.",
    sizes: [
      { name: "Basic", price: 60, original_price: 70, stock: 100, image: "/images/1000090824.jpg" },
      { name: "Complete", price: 120, original_price: 140, stock: 100, image: "/images/1000090824.jpg" },
      { name: "Premium Deluxe", price: 250, original_price: 300, stock: 50, image: "/images/1000090824.jpg" }
    ],
    tags: ["wedding", "vivah", "complete", "telugu"],
    badge: "popular",
    inStock: true,
    featured: true
  },
  {
    id: 35,
    category: "havan",
    categoryName: "Havan Samagri",
    name: "Zed Black Luxury Fresh Pineapple Agarbatti",
    telugu: "హవన్ కుండ్",
    price: 50,
    originalPrice: 60,
    rating: 4.9,
    reviews: 9,
    image: "/images/1000090828.jpg",
    images: ["/images/1000090828.jpg"],
    description: "Pure copper havan kund for performing Agni puja and homam at home. Traditional pyramid shape, durable copper, easy to clean, comes with stand.",
    sizes: [
      { name: "Small (6\")", price: 50, original_price: 60, stock: 100, image: "/images/1000090828.jpg" },
      { name: "Medium (9\")", price: 110, original_price: 130, stock: 100, image: "/images/1000090828.jpg" },
      { name: "Large (12\")", price: 180, original_price: 210, stock: 100, image: "/images/1000090828.jpg" }
    ],
    tags: ["havan", "homam", "copper"],
    badge: "sale",
    inStock: true,
    featured: true
  },
  {
    id: 33,
    category: "malas",
    categoryName: "Malas & Rosaries",
    name: "Darshan White Stone Incense Sticks",
    telugu: "బంతి పూల మాల",
    price: 55,
    originalPrice: 60,
    rating: 4.7,
    reviews: 15,
    image: "/images/1000090826.jpg",
    images: ["/images/1000090826.jpg"],
    description: "Artificial marigold flower garland for deity decoration. Premium quality silk-finish flowers, vibrant orange/yellow. Reusable, long-lasting, no maintenance required.",
    sizes: [
      { name: "2 ft", price: 55, original_price: 60, stock: 100, image: "/images/1000090826.jpg" },
      { name: "4 ft", price: 95, original_price: 110, stock: 100, image: "/images/1000090826.jpg" },
      { name: "6 ft", price: 140, original_price: 160, stock: 100, image: "/images/1000090826.jpg" }
    ],
    tags: ["marigold", "decoration", "garland"],
    badge: "new",
    inStock: true,
    featured: true
  },
  {
    id: 24,
    category: "photos",
    categoryName: "God Photos & Frames",
    name: "Darshan Black Stone Incense Sticks",
    telugu: "నవగ్రహ దేవతలు",
    price: 50,
    originalPrice: 60,
    rating: 4.9,
    reviews: 14,
    image: "/images/1000090827.jpg",
    images: ["/images/1000090827.jpg"],
    description: "All nine planet deities in one beautiful frame. Essential for navgraha puja and home altar. Premium print, gold border frame.",
    sizes: [
      { name: "8×10 inch", price: 50, original_price: 60, stock: 100, image: "/images/1000090827.jpg" },
      { name: "12×15 inch", price: 90, original_price: 110, stock: 100, image: "/images/1000090827.jpg" }
    ],
    tags: ["navgraha", "nine planets", "special puja"],
    badge: null,
    inStock: true,
    featured: true
  },
  {
    id: 22,
    category: "photos",
    categoryName: "God Photos & Frames",
    name: "Balaji 100 Agarbathi",
    telugu: "లక్ష్మీదేవి ఫోటో",
    price: 60,
    originalPrice: 70,
    rating: 5,
    reviews: 21,
    image: "/images/1000090825.jpg",
    images: ["/images/1000090825.jpg"],
    description: "Auspicious Goddess Lakshmi photo with golden border frame. High-resolution divine image, premium print on canvas board. Brings prosperity and blessings to your home.",
    sizes: [
      { name: "4×6 inch", price: 40, original_price: 50, stock: 100, image: "/images/1000090825.jpg" },
      { name: "6×8 inch", price: 60, original_price: 70, stock: 100, image: "/images/1000090825.jpg" },
      { name: "8×10 inch", price: 90, original_price: 110, stock: 100, image: "/images/1000090825.jpg" },
      { name: "12×15 inch", price: 150, original_price: 180, stock: 100, image: "/images/1000090825.jpg" }
    ],
    tags: ["lakshmi", "prosperity", "home blessing"],
    badge: "popular",
    inStock: true,
    featured: true
  }
];

export const FESTIVALS = [
  { cat: 'festivals', color: '#ff9900', emoji: '🪔', name: 'Diwali', telugu: 'దీపావళి', date: 'Nov 12', image: '/images/festival_diwali.webp' },
  { cat: 'festivals', color: '#ff5500', emoji: '🐘', name: 'Ganesh Chaturthi', telugu: 'వినాయక చవితి', date: 'Sep 18', image: '/images/festival_ganesh.webp' },
  { cat: 'festivals', color: '#00aa55', emoji: '🥭', name: 'Ugadi', telugu: 'ఉగాది', date: 'Mar 22', image: '/images/festival_ugadi.webp' }
];

export const TESTIMONIALS = [
  {
    text: "The quality of pooja samagri at Sri Manikanta is truly exceptional. We source all our temple requirements from here because of their uncompromising purity and prompt service.",
    name: 'Raghavendra Shastri', location: 'Head Priest, Local Temple', avatar: '🕉️', rating: 5
  },
  {
    text: "I am deeply impressed by their extensive collection and authentic products. Their wedding kits are incredibly comprehensive and thoughtfully curated for traditional Telugu rituals.",
    name: 'Suryanarayana Murthy', location: 'Dilsukhnagar, Hyderabad', avatar: '🙏', rating: 5
  },
  {
    text: "As a regular customer for the past 5 years, I can vouch for their consistency. From fresh camphor to premium agarbattis, every item reflects devotion and professional quality.",
    name: 'Meenakshi Iyer', location: 'LB Nagar, Hyderabad', avatar: '🌸', rating: 5
  },
  {
    text: "Outstanding customer service and fast delivery! They helped me find the exact brass idols I needed for my new home. Highly recommended for all spiritual needs.",
    name: 'Venkatesh Rao', location: 'Kothapet, Hyderabad', avatar: '🪔', rating: 5
  },
  {
    text: "Very genuine products and great packaging. The ghee quality is excellent for daily deeparadhana. Highly recommended store.",
    name: 'Anil Kumar', location: 'Kukatpally, Hyderabad', avatar: '🔔', rating: 5
  },
  {
    text: "I found everything I needed for Varamahalakshmi Vratham here. The prices are very reasonable and the staff is very helpful.",
    name: 'Lakshmi Narayana', location: 'Secunderabad', avatar: '🌿', rating: 5
  }
];

export const STORE_GALLERY = [
  { src: '/images/store_exterior_1.webp', alt: 'Sri Manikanta Pooja Store Front' },
  { src: '/images/store_1.webp', alt: 'Sri Manikanta Pooja Store — View 1' },
  { src: '/images/store_2.webp', alt: 'Sri Manikanta Store — View 2' },
  { src: '/images/store_3.webp', alt: 'Sri Manikanta Store — View 3' },
  { src: '/images/store_4.webp', alt: 'Sri Manikanta Store — View 4' },
  { src: '/images/store_5.webp', alt: 'Sri Manikanta Store — View 5' },
  { src: '/images/store_6.webp', alt: 'Sri Manikanta Store — View 6' },
  { src: '/images/store_7.webp', alt: 'Sri Manikanta Store — View 7' },
  { src: '/images/store_8.webp', alt: 'Sri Manikanta Store — View 8' }
];

export const HERO_SLIDES = [
  {
    image: '/images/hero_slide_1.webp',
    mobileImage: '/images/hero_slide_1_mobile.webp',
    tag: 'ॐ Welcome to Sri Manikanta Pooja Stores',
    title: 'Your Sacred Pooja Samagri All in One Place',
    highlight: 'Pooja Samagri',
    desc: 'Premium quality agarbatti, camphor, kumkum, haldi, diyas and all pooja essentials for every Hindu ritual and festival.',
    btn1: { text: 'Shop Now', href: '/shop', class: 'btn-primary btn-lg' },
    btn2: { text: 'View Categories', href: '/shop', class: 'btn-white btn-lg' },
    badge: { num: '500+', label: 'Products' }
  },
  {
    image: '/images/hero_slide_2.webp',
    tag: '✨ Festival Season Specials',
    title: 'Complete Festival Kits For Every Occasion',
    highlight: 'Festival Kits',
    desc: 'Diwali, Ganesh Chaturthi, Ugadi, Navratri — get everything you need in one box. Authentic, pure and delivered to your door.',
    btn1: { text: 'Festival Kits', href: '/shop?category=festivals', class: 'btn-primary btn-lg' },
    btn2: { text: 'View All Items', href: '/shop', class: 'btn-white btn-lg' },
    badge: { num: '20+', label: 'Yrs in Business' }
  },
  {
    image: '/images/hero_slide_3.webp',
    tag: '💍 Wedding & Marriage Items',
    title: 'Complete Telugu Wedding Samagri Available',
    highlight: 'Telugu Wedding',
    desc: 'All traditional Telugu Brahmin wedding items — kankanam, mangalsutra thread, kalash, agnihotra samagri and more in one stop.',
    btn1: { text: 'Wedding Items', href: '/shop?category=wedding', class: 'btn-primary btn-lg' },
    btn2: { text: 'View All Items', href: '/shop', class: 'btn-white btn-lg' },
    badge: { num: '25+', label: 'Yrs Experience' }
  },
  {
    image: '/images/hero_slide_4.webp',
    tag: '🕉️ Pure & Traditional',
    title: 'Beautiful God Idols & Temple Brassware',
    highlight: 'God Idols',
    desc: 'Enhance your mandir with our wide range of carefully crafted brass idols, pure silver diyas, and authentic pooja bells.',
    btn1: { text: 'Shop Idols', href: '/shop?category=idols', class: 'btn-primary btn-lg' },
    btn2: { text: 'Visit Store', href: '#store-map', class: 'btn-white btn-lg', isMap: true },
    badge: { num: '100%', label: 'Authentic' }
  },
  {
    image: '/images/hero_slide_5.webp',
    tag: '🌿 Premium Fragrances',
    title: 'Pure Agarbatti & Dhoop For Daily Pooja',
    highlight: 'Agarbatti & Dhoop',
    desc: 'Fill your home with divine fragrance. Shop our premium collection of incense sticks, dhoop cones, and sambrani.',
    btn1: { text: 'View Products', href: '/shop?category=agarbatti', class: 'btn-primary btn-lg' },
    btn2: { text: 'Contact Us', href: '/contact', class: 'btn-white btn-lg' },
    badge: { num: '5★', label: 'Quality' }
  },
  {
    image: '/images/hero_slide_6.webp',
    tag: '🔴 Sacred Offerings',
    title: 'Authentic Kumkum & Haldi For Rituals',
    highlight: 'Kumkum & Haldi',
    desc: '100% pure and natural turmeric powder, sindoor, and kumkum directly sourced for your daily spiritual needs.',
    btn1: { text: 'Shop Now', href: '/shop?category=kumkum', class: 'btn-primary btn-lg' },
    btn2: { text: 'Shop Online', href: '/shop', class: 'btn-white btn-lg' },
    badge: { num: '1000+', label: 'Happy Clients' }
  },
  {
    image: '/images/hero_slide_7.webp',
    tag: '📿 Spiritual Accessories',
    title: 'Beautiful Malas & Garlands For Deities',
    highlight: 'Malas & Garlands',
    desc: 'Find the perfect adornments for your idols. We carry tulsi malas, rudraksha, and decorative garlands.',
    btn1: { text: 'View Malas', href: '/shop?category=malas', class: 'btn-primary btn-lg' },
    btn2: { text: 'Shop Online', href: '/shop', class: 'btn-white btn-lg' },
    badge: { num: 'Best', label: 'Designs' }
  },
  {
    image: '/images/hero_slide_8.webp',
    tag: '🍽️ Pooja Essentials',
    title: 'Traditional Pooja Thalis & Accessories',
    highlight: 'Pooja Thalis',
    desc: 'Complete your pooja room with our beautiful brass and silver-plated thalis, plates, and aarti items.',
    btn1: { text: 'Shop Thalis', href: '/shop?category=thali', class: 'btn-primary btn-lg' },
    btn2: { text: 'Shop Online', href: '/shop', class: 'btn-white btn-lg' },
    badge: { num: 'Pure', label: 'Brass' }
  },
  {
    image: '/images/hero_slide_9.webp',
    tag: '🪔 Light the Lamp',
    title: 'Pure Pooja Oils & Ghee For Deepam',
    highlight: 'Pooja Oils & Ghee',
    desc: 'Ensure a long-lasting and pure flame. Shop our premium sesame oil, castor oil, and pure cow ghee for diyas.',
    btn1: { text: 'Shop Oils', href: '/shop?category=oils', class: 'btn-primary btn-lg' },
    btn2: { text: 'Shop Online', href: '/shop', class: 'btn-white btn-lg' },
    badge: { num: '100%', label: 'Pure' }
  }
];

// Helper to fetch with token
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('smps_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };
  
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`API call failed to ${endpoint}:`, err);
    return null;
  }
}

export const api = {
  // Categories
  async getCategories() {
    const data = await apiFetch('/categories');
    return (data && data.success && data.categories) ? data.categories : FALLBACK_CATEGORIES;
  },

  // Products
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams(params).toString();
    const data = await apiFetch(`/products${searchParams ? '?' + searchParams : ''}`);
    if (data && data.success && data.products) {
      return data.products;
    }
    // Filter fallback if backend is unreachable
    let prods = [...FALLBACK_PRODUCTS];
    if (params.category && params.category !== 'all') {
      prods = prods.filter(p => p.category === params.category);
    }
    if (params.search || params.q) {
      const q = (params.search || params.q).toLowerCase();
      prods = prods.filter(p => p.name.toLowerCase().includes(q) || (p.telugu && p.telugu.includes(q)));
    }
    if (params.badge) {
      prods = prods.filter(p => p.badge === params.badge);
    }
    return prods;
  },

  async getProductById(id) {
    const data = await apiFetch(`/products/${id}`);
    if (data && data.success && data.product) {
      return { product: data.product, related: data.related || [] };
    }
    const product = FALLBACK_PRODUCTS.find(p => p.id === Number(id)) || FALLBACK_PRODUCTS[0];
    const related = FALLBACK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
    return { product, related };
  },

  // Reviews
  async getReviews() {
    const data = await apiFetch('/reviews');
    return (data && data.success && data.reviews) ? data.reviews : TESTIMONIALS;
  },

  async submitReview(reviewData) {
    return await apiFetch('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  },

  // Auth
  async login(credentials) {
    return await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  async register(userData) {
    return await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  async getMe() {
    return await apiFetch('/auth/me');
  },

  // Orders
  async createOrder(orderData) {
    const res = await apiFetch('/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
    if (res && res.success) return res;
    // Fallback order confirmation for offline demo
    return {
      success: true,
      order_id: Math.floor(Math.random() * 1000) + 1,
      order_number: `SMPS-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      order: {
        ...orderData,
        order_number: `SMPS-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        created_at: new Date().toISOString()
      }
    };
  },

  async getUserOrders() {
    const data = await apiFetch('/orders');
    return (data && data.success && data.orders) ? data.orders : [];
  },

  // Enquiry
  async submitEnquiry(enquiryData) {
    return await apiFetch('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiryData)
    });
  }
};
