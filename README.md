# Sri Manikanta Pooja Stores — Web Application

A faithful, pixel-accurate reproduction of the Sri Manikanta Pooja Stores website ([https://manikantapoojastore.com/](https://manikantapoojastore.com/)), Hyderabad's premier pooja samagri store serving devotees since 2005.

---

## 📖 Overview

This project faithfully reproduces the entire visual design, responsive behavior, navigation architecture, and interactive e-commerce functionality of Sri Manikanta Pooja Stores in Dilsukhnagar, Hyderabad.

### Key Highlights
- **100% Visual Matching**: Exact section order, typography (`Cinzel`, `Poppins`, `Noto Sans Telugu`), color palette (`#7B1A1A` Maroon, `#FF7722` Saffron, `#C9A84C` Gold, `#FDF6EC` Cream), spacing, borders, shadows, and responsive behaviors.
- **Authentic Assets**: High-resolution original banners (slides 1–9, desktop and mobile), authentic product photographs, category graphics, festival banners, and store exterior/interior photographs.
- **Full Interactive Functionality**:
  - Interactive hero banner with animated progress bar, pause on hover, slide dots, and navigation controls.
  - Live store status calculator (open/closed/closing-soon status based on current Hyderabad time).
  - Dynamic product catalog with category sidebar filtering, price range slider, badge filters (Popular, New Arrivals, On Sale), search, sorting, and grid/list view toggles.
  - Multi-variant size selection (e.g. 210g, 75g, small, 145g) updating prices, discounts, and thumbnail preview images in real time.
  - Complete shopping cart with quantity modifications, catalog savings, promo coupon application, and `localStorage` persistence.
  - 4-Step checkout workflow supporting Cash on Delivery, WhatsApp Instant Order, and Interactive UPI QR code scanner with the store's QR code.
  - Customer review submission with interactive star ratings.
  - Dedicated Contact Us page with contact details, store hours table, quick facts, and Google Maps embed.
  - Amazon-style side navigation drawer ("All" menu button) with category shortcuts, account links, and help options.
  - Quick WhatsApp Enquiry modal and floating actions (WhatsApp chat, phone call, community join, scroll-to-top, and floating cart button).

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js 18 / 19 with JSX
- **Bundler**: Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Pure CSS3 with Custom Properties matching the original design system
- **Icons & Fonts**: Font Awesome 6.5.0, Google Fonts (`Cinzel`, `Poppins`, `Noto Sans Telugu`)
- **State Management**: React Context (`StoreContext`) with `localStorage` persistence for Cart, Wishlist, and Auth

### Backend
- **Framework**: Python 3 Flask REST API
- **ORM / Database**: Flask-SQLAlchemy with SQLite (`pooja_store.db`)
- **Authentication**: JWT (JSON Web Tokens) with Werkzeug password hashing
- **CORS**: Flask-CORS for seamless cross-origin communication

---

## 📂 Project Structure

```
srimanikanta/
├── backend/
│   ├── app.py              # Flask REST API endpoints
│   ├── config.py           # Database & JWT configuration
│   ├── models.py           # SQLAlchemy database models (Product, Category, Order, User, etc.)
│   ├── seed.py             # Database initialization and authentic data seeder
│   ├── requirements.txt    # Python dependencies
│   └── pooja_store.db      # SQLite database
│
├── frontend/
│   ├── index.html          # HTML shell with Google Fonts, Font Awesome, and JSON-LD
│   ├── vite.config.js      # Vite config with API proxy to Flask
│   ├── package.json
│   ├── public/
│   │   ├── images/         # Original hero slides 1-9, category icons, store photos, QR code
│   │   ├── uploads/        # Original product images
│   │   ├── icons/          # PWA icons
│   │   └── manifest.json   # PWA manifest
│   └── src/
│       ├── components/
│       │   ├── AnnouncementBar.jsx      # Marquee ticker bar
│       │   ├── Header.jsx               # Header with logo, navigation, search, cart, profile
│       │   ├── SideDrawer.jsx           # Amazon-style "All" side drawer
│       │   ├── HeroSlider.jsx           # 9-slide hero slider with progress bar & dots
│       │   ├── FeaturesBar.jsx          # Live store status & 4 core features
│       │   ├── CategoriesSection.jsx    # Browse by Category grid (14 categories)
│       │   ├── ProductCard.jsx          # Product card with variant pills & wishlist
│       │   ├── FeaturedProductsSection.jsx # Best-selling items grid
│       │   ├── FestivalsSection.jsx     # Shop by Festival (Diwali, Ganesh, Ugadi)
│       │   ├── WhyChooseUs.jsx          # 6 promise cards with icons
│       │   ├── TestimonialsSection.jsx  # Customer reviews with ratings & avatars
│       │   ├── StoreGallerySection.jsx  # 9 real store photos with lightbox zoom modal
│       │   ├── WhatsAppCommunityBanner.jsx # CTA section
│       │   ├── Footer.jsx               # 4-column footer with contact info & store hours
│       │   ├── QuickEnquiryModal.jsx    # WhatsApp enquiry modal
│       │   ├── StoreMapModal.jsx        # Google Maps popup modal
│       │   ├── FloatingActions.jsx      # Floating WhatsApp, Call, Community & Cart buttons
│       │   └── ToastContainer.jsx       # Notification toasts
│       ├── pages/
│       │   ├── Home.jsx                 # Complete verified homepage layout
│       │   ├── Shop.jsx                 # Product catalog with sidebar filters
│       │   ├── ProductDetails.jsx       # Product page with gallery, variants, and reviews
│       │   ├── Cart.jsx                 # Cart page with discounts and promo coupons
│       │   ├── Checkout.jsx             # 4-step checkout with COD, UPI QR, and WhatsApp
│       │   ├── About.jsx                # About Us with story, stats, and values
│       │   ├── Contact.jsx              # Contact Us with hours, facts, and maps
│       │   ├── Reviews.jsx              # Customer reviews page with submission form
│       │   ├── Login.jsx                # Customer login
│       │   ├── Register.jsx             # Customer registration
│       │   ├── Account.jsx              # Profile & order history
│       │   ├── Policies.jsx             # Privacy, Terms, and Shipping policies
│       │   └── NotFound.jsx             # 404 page
│       ├── services/
│       │   ├── api.js                   # API client and authentic fallback dataset
│       │   └── storeContext.jsx         # Global state (Cart, Wishlist, User, Modals)
│       ├── styles/
│       │   ├── style.css
│       │   ├── components.css
│       │   ├── home.css
│       │   ├── shop.css
│       │   ├── mobile.css
│       │   └── cart-new.min.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── .env.example            # Environment configuration template
└── README.md               # Documentation
```

---

## 🚀 Installation & Running Instructions

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Initialize database and seed authentic products & categories
python seed.py

# Start Flask backend server (runs on http://127.0.0.1:5000)
python app.py
```

### 3. Frontend Setup
```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install npm dependencies
npm install

# Start Vite development server (runs on http://localhost:3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔍 Verification & Inspection Checklist

| Page / Section | Reference Verified | Recreated Status | Functional Features |
|---|---|---|---|
| **Announcement Bar** | ✅ Yes | ✅ Recreated | Marquee ticker with verified phone numbers & free delivery note |
| **Main Header & Logo** | ✅ Yes | ✅ Recreated | Logo, Telugu subtitle, nav links, Quick Enquiry, search, profile |
| **Hero Slider (9 slides)** | ✅ Yes | ✅ Recreated | Autoplay, progress bar, pause on hover, slide dots, prev/next arrows |
| **Features Bar** | ✅ Yes | ✅ Recreated | Live store open/closed status pill + 4 core feature cards |
| **Browse by Category** | ✅ Yes | ✅ Recreated | 14 category cards with authentic images & product count |
| **Best Selling Products** | ✅ Yes | ✅ Recreated | Authentic items with variant picker pills, discount badges, add-to-cart |
| **Shop by Festival** | ✅ Yes | ✅ Recreated | Diwali, Ganesh Chaturthi, Ugadi cards with Telugu names & dates |
| **Why Choose Us** | ✅ Yes | ✅ Recreated | 6 benefit cards with exact icons, titles, and descriptions |
| **Testimonials** | ✅ Yes | ✅ Recreated | Devotee & priest reviews with star ratings and Hyderabad locations |
| **Store Gallery** | ✅ Yes | ✅ Recreated | 9 real Google Maps store photos with lightbox zoom modal |
| **WhatsApp Community CTA** | ✅ Yes | ✅ Recreated | Verified WhatsApp community link & Instagram link |
| **Footer** | ✅ Yes | ✅ Recreated | 4 columns, store hours, 4 verified phone numbers, policies |
| **Shop Catalog Page** | ✅ Yes | ✅ Recreated | Category filter, price slider, badges filter, sorting, grid/list view |
| **Product Detail Page** | ✅ Yes | ✅ Recreated | Gallery thumbnails, variant selector, quantity, buy now, WhatsApp enquiry |
| **Shopping Cart** | ✅ Yes | ✅ Recreated | Quantity controller, catalog discount, coupon codes, order summary |
| **Checkout Workflow** | ✅ Yes | ✅ Recreated | Shipping details form, COD, UPI QR scan modal, order receipt |
| **Customer Reviews Page** | ✅ Yes | ✅ Recreated | Review submission form with 1–5 star picker & review list |
| **About Us Page** | ✅ Yes | ✅ Recreated | Story, 25+ years stats, 6 commitment values, store interior gallery |
| **Contact Us Page** | ✅ Yes | ✅ Recreated | Store status, 3 direct call buttons, WhatsApp form, hours table, map |
| **Login & Register** | ✅ Yes | ✅ Recreated | Customer authentication with password toggle & validation |
| **Floating Actions** | ✅ Yes | ✅ Recreated | Floating WhatsApp, Phone call, WhatsApp Community, Scroll-to-top, Cart |

---

## 📞 Verified Store Contact Information
- **Store Name**: Sri Manikanta Pooja Stores
- **Address**: Konark Theatre Lane, opposite Sanjay Super Market, P&T Colony, Dilsukhnagar, Hyderabad, Telangana 500060
- **Phone Numbers**:
  - `+91 91105 82086`
  - `+91 98499 85423`
  - `+91 91828 14818`
  - `+91 90147 58196`
- **WhatsApp Support**: `919849985423` & `919110582086`
- **Instagram**: `@srimanikanta_poojastores`
- **WhatsApp Community**: [Join Community](https://chat.whatsapp.com/KoJUjAeLjgFDm00ZMESWnx)
