import json
import os
from werkzeug.security import generate_password_hash
from app import create_app
from models import db, Category, Product, Review, User

app = create_app()

CATEGORIES_DATA = [
    {
        "id": "agarbatti",
        "name": "Agarbatti & Incense",
        "telugu": "అగర్బత్తి",
        "img": "images/cat_agarbatti.webp",
        "desc": "Premium hand-rolled fragrant agarbatti, incense sticks and dhoop.",
        "emoji": "🕉️",
        "count": 1
    },
    {
        "id": "camphor",
        "name": "Camphor (Kapoor)",
        "telugu": "కర్పూరం",
        "img": "images/cat_camphor.webp",
        "desc": "100% pure Bhimseni and tablet camphor for divine aarti.",
        "emoji": "✨",
        "count": 0
    },
    {
        "id": "kumkum",
        "name": "Kumkum & Haldi",
        "telugu": "కుంకుమ పసుపు",
        "img": "images/cat_kumkum.webp",
        "desc": "Pure chemical-free traditional kumkum and turmeric powder.",
        "emoji": "🔴",
        "count": 0
    },
    {
        "id": "oils",
        "name": "Pooja Oils & Ghee",
        "telugu": "నూనె & నెయ్యి",
        "img": "images/cat_oils.webp",
        "desc": "Pure sesame oil, deepam oil and pure cow ghee for diyas.",
        "emoji": "🪔",
        "count": 0
    },
    {
        "id": "diyas",
        "name": "Diyas & Lamps",
        "telugu": "దీపాలు",
        "img": "images/cat_diyas.webp",
        "desc": "Traditional brass, clay and silver-plated diyas and samai.",
        "emoji": "🪔",
        "count": 0
    },
    {
        "id": "photos",
        "name": "God Photos & Frames",
        "telugu": "దేవుడి ఫోటోలు",
        "img": "images/cat_photos.webp",
        "desc": "Auspicious high quality laminated and framed deity photos.",
        "emoji": "🖼️",
        "count": 2
    },
    {
        "id": "idols",
        "name": "Idols (Vigrahas)",
        "telugu": "విగ్రహాలు",
        "img": "images/cat_idols.webp",
        "desc": "Handcrafted pure brass, panchaloha and marble deity idols.",
        "emoji": "🗿",
        "count": 0
    },
    {
        "id": "thali",
        "name": "Puja Thali & Vessels",
        "telugu": "పూజా పాత్రలు",
        "img": "images/cat_thali.webp",
        "desc": "Brass and copper panchapatra, uddharini, thalis and ghantas.",
        "emoji": "🍽️",
        "count": 0
    },
    {
        "id": "malas",
        "name": "Malas & Rosaries",
        "telugu": "మాలలు",
        "img": "images/cat_malas.webp",
        "desc": "Sacred tulsi, rudraksha, lotus seed malas and decorative garlands.",
        "emoji": "📿",
        "count": 1
    },
    {
        "id": "havan",
        "name": "Havan Samagri",
        "telugu": "హవన్ సామగ్రి",
        "img": "images/cat_havan.webp",
        "desc": "Pure copper havan kund, wood, herbs and complete homam samagri.",
        "emoji": "🔥",
        "count": 1
    },
    {
        "id": "festivals",
        "name": "Festival Kits",
        "telugu": "పండుగ కిట్లు",
        "img": "images/cat_festival.webp",
        "desc": "All-in-one puja kits for Diwali, Vinayaka Chavithi, Ugadi and more.",
        "emoji": "🎉",
        "count": 0
    },
    {
        "id": "wedding",
        "name": "Wedding Items",
        "telugu": "వివాహ సామగ్రి",
        "img": "images/cat_wedding.webp",
        "desc": "Authentic Telugu Brahmin and Hindu wedding ceremony essentials.",
        "emoji": "💍",
        "count": 1
    },
    {
        "id": "dhoop-sticks",
        "name": "Dhoop Sticks",
        "telugu": "ధూప్ స్టిక్స్",
        "img": "images/cat_dhoop.webp",
        "desc": "Charcoal-free natural dhoop sticks and sambrani cups.",
        "emoji": "🌸",
        "count": 0
    },
    {
        "id": "more-and-other",
        "name": "More and other",
        "telugu": "ఇతర పూజా సామగ్రి",
        "img": "images/cat_other.webp",
        "desc": "Cotton wicks, rangoli colours, sacred threads and miscellaneous items.",
        "emoji": "🌸",
        "count": 0
    }
]

PRODUCTS_DATA = [
    {
        "id": 5006,
        "category": "agarbatti",
        "category_name": "Agarbatti & Incense",
        "name": "Ambica Durbar Bathi Agarbathi",
        "telugu": "అంబికా దుర్బార్ బత్తి అగరబత్తి",
        "price": 110.0,
        "original_price": 120.0,
        "rating": 5.0,
        "reviews": 12,
        "image": "uploads/products/prod_1782831283_6cd1e755.jpg",
        "images_json": json.dumps([
            "uploads/products/prod_1782831283_6cd1e755.jpg",
            "uploads/products/prod_1782830063_e7b929a4.jpg",
            "uploads/products/prod_1782830068_82a0f0cd.jpg",
            "uploads/products/prod_1782831350_d3ad8f73.jpg"
        ]),
        "description": "Ambica Durbar Bathi is a premium herbal agarbathi made from a blend of 63 natural herbs. Hand-rolled in India by ACP Industries Ltd., Eluru. It produces a pleasant, long-lasting fragrance suitable for daily pooja, meditation, spiritual practice, creating a peaceful atmosphere at home and temples.",
        "sizes_json": json.dumps([
            {
                "name": "210g",
                "price": 110,
                "original_price": 120,
                "stock": 100,
                "image": "uploads/products/prod_1782831283_6cd1e755.jpg"
            },
            {
                "name": "75g",
                "price": 60,
                "original_price": 70,
                "stock": 100,
                "image": "uploads/products/prod_1782830063_e7b929a4.jpg"
            },
            {
                "name": "small",
                "price": 25,
                "original_price": 30,
                "stock": 100,
                "image": "uploads/products/prod_1782830068_82a0f0cd.jpg"
            },
            {
                "name": "145g",
                "price": 90,
                "original_price": 110,
                "stock": 100,
                "image": "uploads/products/prod_1782831350_d3ad8f73.jpg"
            }
        ]),
        "tags_json": json.dumps(["agarbatti", "ambica", "durbar", "herbal", "daily puja"]),
        "badge": "Best Seller",
        "in_stock": True,
        "featured": True
    },
    {
        "id": 39,
        "category": "wedding",
        "category_name": "Wedding Items",
        "name": "Zed Black 3-in-1 Premium Agarbatti",
        "telugu": "వివాహ సామగ్రి కిట్",
        "price": 60.0,
        "original_price": 50.0,
        "rating": 4.8,
        "reviews": 18,
        "image": "images/1000090824.jpg",
        "images_json": json.dumps(["images/1000090824.jpg"]),
        "description": "Complete Telugu Brahmin wedding puja kit. Includes: coconut, beetle leaves & nuts, mango leaves, sacred thread, turmeric pieces, bangles, sacred cloth, kankanam thread, akshat, and all ritual items as per Telugu Shastras.",
        "sizes_json": json.dumps([
            {"name": "Basic", "price": 60, "original_price": 70, "stock": 100, "image": "images/1000090824.jpg"},
            {"name": "Complete", "price": 120, "original_price": 140, "stock": 100, "image": "images/1000090824.jpg"},
            {"name": "Premium Deluxe", "price": 250, "original_price": 300, "stock": 50, "image": "images/1000090824.jpg"}
        ]),
        "tags_json": json.dumps(["wedding", "vivah", "complete", "telugu"]),
        "badge": "popular",
        "in_stock": True,
        "featured": True
    },
    {
        "id": 35,
        "category": "havan",
        "category_name": "Havan Samagri",
        "name": "Zed Black Luxury Fresh Pineapple Agarbatti",
        "telugu": "హవన్ కుండ్",
        "price": 50.0,
        "original_price": 60.0,
        "rating": 4.9,
        "reviews": 9,
        "image": "images/1000090828.jpg",
        "images_json": json.dumps(["images/1000090828.jpg"]),
        "description": "Pure copper havan kund for performing Agni puja and homam at home. Traditional pyramid shape, durable copper, easy to clean, comes with stand.",
        "sizes_json": json.dumps([
            {"name": "Small (6\")", "price": 50, "original_price": 60, "stock": 100, "image": "images/1000090828.jpg"},
            {"name": "Medium (9\")", "price": 110, "original_price": 130, "stock": 100, "image": "images/1000090828.jpg"},
            {"name": "Large (12\")", "price": 180, "original_price": 210, "stock": 100, "image": "images/1000090828.jpg"}
        ]),
        "tags_json": json.dumps(["havan", "homam", "copper", "puja"]),
        "badge": "sale",
        "in_stock": True,
        "featured": True
    },
    {
        "id": 33,
        "category": "malas",
        "category_name": "Malas & Rosaries",
        "name": "Darshan White Stone Incense Sticks",
        "telugu": "బంతి పూల మాల",
        "price": 55.0,
        "original_price": 60.0,
        "rating": 4.7,
        "reviews": 15,
        "image": "images/1000090826.jpg",
        "images_json": json.dumps(["images/1000090826.jpg"]),
        "description": "Artificial marigold flower garland for deity decoration. Premium quality silk-finish flowers, vibrant orange/yellow. Reusable, long-lasting, no maintenance required.",
        "sizes_json": json.dumps([
            {"name": "2 ft", "price": 55, "original_price": 60, "stock": 100, "image": "images/1000090826.jpg"},
            {"name": "4 ft", "price": 95, "original_price": 110, "stock": 100, "image": "images/1000090826.jpg"},
            {"name": "6 ft", "price": 140, "original_price": 160, "stock": 100, "image": "images/1000090826.jpg"}
        ]),
        "tags_json": json.dumps(["marigold", "decoration", "garland"]),
        "badge": "new",
        "in_stock": True,
        "featured": True
    },
    {
        "id": 24,
        "category": "photos",
        "category_name": "God Photos & Frames",
        "name": "Darshan Black Stone Incense Sticks",
        "telugu": "నవగ్రహ దేవతలు",
        "price": 50.0,
        "original_price": 60.0,
        "rating": 4.9,
        "reviews": 14,
        "image": "images/1000090827.jpg",
        "images_json": json.dumps(["images/1000090827.jpg"]),
        "description": "All nine planet deities in one beautiful frame. Essential for navgraha puja and home altar. Premium print, gold border frame.",
        "sizes_json": json.dumps([
            {"name": "8×10 inch", "price": 50, "original_price": 60, "stock": 100, "image": "images/1000090827.jpg"},
            {"name": "12×15 inch", "price": 90, "original_price": 110, "stock": 100, "image": "images/1000090827.jpg"}
        ]),
        "tags_json": json.dumps(["navgraha", "nine planets", "special puja"]),
        "badge": None,
        "in_stock": True,
        "featured": True
    },
    {
        "id": 22,
        "category": "photos",
        "category_name": "God Photos & Frames",
        "name": "Balaji 100 Agarbathi",
        "telugu": "లక్ష్మీదేవి ఫోటో",
        "price": 60.0,
        "original_price": 70.0,
        "rating": 5.0,
        "reviews": 21,
        "image": "images/1000090825.jpg",
        "images_json": json.dumps(["images/1000090825.jpg"]),
        "description": "Auspicious Goddess Lakshmi photo with golden border frame. High-resolution divine image, premium print on canvas board. Brings prosperity and blessings to your home.",
        "sizes_json": json.dumps([
            {"name": "4×6 inch", "price": 40, "original_price": 50, "stock": 100, "image": "images/1000090825.jpg"},
            {"name": "6×8 inch", "price": 60, "original_price": 70, "stock": 100, "image": "images/1000090825.jpg"},
            {"name": "8×10 inch", "price": 90, "original_price": 110, "stock": 100, "image": "images/1000090825.jpg"},
            {"name": "12×15 inch", "price": 150, "original_price": 180, "stock": 100, "image": "images/1000090825.jpg"}
        ]),
        "tags_json": json.dumps(["lakshmi", "prosperity", "home blessing"]),
        "badge": "popular",
        "in_stock": True,
        "featured": True
    }
]

REVIEWS_DATA = [
    {
        "author_name": "Raghavendra Shastri",
        "author_location": "Head Priest, Local Temple",
        "author_avatar": "🕉️",
        "rating": 5,
        "comment": "The quality of pooja samagri at Sri Manikanta is truly exceptional. We source all our temple requirements from here because of their uncompromising purity and prompt service."
    },
    {
        "author_name": "Suryanarayana Murthy",
        "author_location": "Dilsukhnagar, Hyderabad",
        "author_avatar": "🙏",
        "rating": 5,
        "comment": "I am deeply impressed by their extensive collection and authentic products. Their wedding kits are incredibly comprehensive and thoughtfully curated for traditional Telugu rituals."
    },
    {
        "author_name": "Meenakshi Iyer",
        "author_location": "LB Nagar, Hyderabad",
        "author_avatar": "🌸",
        "rating": 5,
        "comment": "As a regular customer for the past 5 years, I can vouch for their consistency. From fresh camphor to premium agarbattis, every item reflects devotion and professional quality."
    },
    {
        "author_name": "Venkatesh Rao",
        "author_location": "Kothapet, Hyderabad",
        "author_avatar": "🪔",
        "rating": 5,
        "comment": "Outstanding customer service and fast delivery! They helped me find the exact brass idols I needed for my new home. Highly recommended for all spiritual needs."
    },
    {
        "author_name": "Anil Kumar",
        "author_location": "Kukatpally, Hyderabad",
        "author_avatar": "🔔",
        "rating": 5,
        "comment": "Very genuine products and great packaging. The ghee quality is excellent for daily deeparadhana. Highly recommended store."
    },
    {
        "author_name": "Lakshmi Narayana",
        "author_location": "Secunderabad",
        "author_avatar": "🌿",
        "rating": 5,
        "comment": "I found everything I needed for Varamahalakshmi Vratham here. The prices are very reasonable and the staff is very helpful."
    }
]

def seed_database():
    with app.app_context():
        db.create_all()
        print("Database tables created.")
        
        # Seed Categories
        for cat in CATEGORIES_DATA:
            existing = Category.query.get(cat['id'])
            if not existing:
                c = Category(**cat)
                db.session.add(c)
            else:
                for k, v in cat.items():
                    setattr(existing, k, v)
        
        # Seed Products
        for prod in PRODUCTS_DATA:
            existing = Product.query.get(prod['id'])
            if not existing:
                p = Product(**prod)
                db.session.add(p)
            else:
                for k, v in prod.items():
                    setattr(existing, k, v)
                    
        # Update category counts
        for cat in CATEGORIES_DATA:
            c = Category.query.get(cat['id'])
            if c:
                c.count = Product.query.filter_by(category=cat['id']).count()
                
        # Seed Reviews
        if Review.query.count() == 0:
            for rev in REVIEWS_DATA:
                r = Review(**rev)
                db.session.add(r)
                
        # Seed demo user
        demo_user = User.query.filter_by(mobile="9849985423").first()
        if not demo_user:
            demo_user = User(
                full_name="Rajesh Sharma",
                email="devotee@manikanta.com",
                mobile="9849985423",
                password_hash=generate_password_hash("Devotion@108")
            )
            db.session.add(demo_user)
            
        db.session.commit()
        print("Seeding completed successfully!")

if __name__ == '__main__':
    seed_database()
