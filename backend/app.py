from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
import random
import os

from config import Config
from models import db, Category, Product, User, Address, Order, OrderItem, Review, Enquiry

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    
    # ── JWT Auth Helpers ─────────────────────────────────────
    def generate_token(user_id):
        payload = {
            'user_id': user_id,
            'exp': datetime.utcnow() + timedelta(days=30),
            'iat': datetime.utcnow()
        }
        return jwt.encode(payload, app.config['JWT_SECRET'], algorithm='HS256')

    def get_current_user():
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None
        token = auth_header.split(' ')[1]
        try:
            payload = jwt.decode(token, app.config['JWT_SECRET'], algorithms=['HS256'])
            return User.query.get(payload['user_id'])
        except Exception:
            return None

    # ── Store Info ───────────────────────────────────────────
    @app.route('/api/store-info', methods=['GET'])
    def get_store_info():
        return jsonify({
            'success': True,
            'store': {
                'name': 'Sri Manikanta Pooja Stores',
                'phones': ['+919110582086', '+919849985423', '+919182814818', '+919014758196'],
                'whatsapp': '919849985423',
                'whatsapp2': '919110582086',
                'whatsapp_group': 'https://chat.whatsapp.com/KoJUjAeLjgFDm00ZMESWnx',
                'instagram': 'https://www.instagram.com/srimanikanta_poojastores?igsh=MWNqYmdxeGl1Nm9qdw==',
                'address': 'Sri Manikanta pooja stores, P&T coloney, dilsukhnagar., Konark Theatre Ln, opposite Sanjay Super Market, Dilsukhnagar, Hyderabad, Telangana 500060',
                'map_embed': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7615.796686244467!2d78.51863469196398!3d17.36862398406134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9992e24cfac1%3A0x84d6068085b897e0!2sSri%20manikanta%20pooja%20stores!5e0!3m2!1sen!2sin!4v1782628485698!5m2!1sen!2sin',
                'map_link': 'https://maps.app.goo.gl/y4TFYSYQsG3ZiySJ8',
                'hours': {
                    'weekdays': '8:00 AM – 10:00 PM',
                    'saturday': '8:00 AM – 10:00 PM',
                    'sunday': '8:30 AM – 10:00 PM',
                    'festivals': '7:00 AM – 11:30 PM'
                }
            }
        })

    # ── Categories ───────────────────────────────────────────
    @app.route('/api/categories', methods=['GET'])
    def get_categories():
        categories = Category.query.all()
        # Ensure count matches actual products
        for c in categories:
            c.count = Product.query.filter_by(category=c.id).count()
        return jsonify({
            'success': True,
            'categories': [c.to_dict() for c in categories]
        })

    # ── Products ─────────────────────────────────────────────
    @app.route('/api/products', methods=['GET'])
    def get_products():
        category = request.args.get('category') or request.args.get('cat')
        search = request.args.get('search') or request.args.get('q')
        badge = request.args.get('badge')
        sort = request.args.get('sort', 'popular')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        featured = request.args.get('featured')
        
        query = Product.query
        
        if category and category != 'all':
            query = query.filter_by(category=category)
            
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                (Product.name.ilike(search_term)) |
                (Product.telugu.ilike(search_term)) |
                (Product.description.ilike(search_term)) |
                (Product.category_name.ilike(search_term))
            )
            
        if badge:
            query = query.filter_by(badge=badge)
            
        if featured == 'true':
            query = query.filter_by(featured=True)
            
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
            
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
            
        # Sorting
        if sort == 'price-asc':
            query = query.order_by(Product.price.asc())
        elif sort == 'price-desc':
            query = query.order_by(Product.price.desc())
        elif sort == 'rating':
            query = query.order_by(Product.rating.desc(), Product.reviews.desc())
        elif sort == 'new':
            query = query.order_by(Product.created_at.desc())
        else: # popular
            query = query.order_by(Product.reviews.desc(), Product.id.desc())
            
        products = query.all()
        return jsonify({
            'success': True,
            'total': len(products),
            'products': [p.to_dict() for p in products]
        })

    @app.route('/api/products/<int:id>', methods=['GET'])
    def get_product(id):
        product = Product.query.get(id)
        if not product:
            return jsonify({'success': False, 'message': 'Product not found'}), 404
        
        # Also fetch related products in the same category
        related = Product.query.filter(Product.category == product.category, Product.id != product.id).limit(4).all()
        if len(related) < 4:
            more = Product.query.filter(Product.id != product.id).limit(4 - len(related)).all()
            related.extend(more)
            
        return jsonify({
            'success': True,
            'product': product.to_dict(),
            'related': [r.to_dict() for r in related]
        })

    # ── Auth ─────────────────────────────────────────────────
    @app.route('/api/auth/register', methods=['POST'])
    def register():
        data = request.get_json() or {}
        full_name = data.get('full_name', '').strip()
        mobile = data.get('mobile', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '')

        if not full_name or not mobile or not password:
            return jsonify({'success': False, 'message': 'Please provide full name, mobile and password'}), 400

        if User.query.filter_by(mobile=mobile).first():
            return jsonify({'success': False, 'message': 'A user with this mobile number already exists'}), 400

        if email and User.query.filter_by(email=email).first():
            return jsonify({'success': False, 'message': 'A user with this email address already exists'}), 400

        user = User(
            full_name=full_name,
            mobile=mobile,
            email=email or None,
            password_hash=generate_password_hash(password)
        )
        db.session.add(user)
        db.session.commit()

        token = generate_token(user.id)
        return jsonify({
            'success': True,
            'token': token,
            'user': user.to_dict(),
            'message': 'Registration successful!'
        }), 201

    @app.route('/api/auth/login', methods=['POST'])
    def login():
        data = request.get_json() or {}
        email_or_mobile = (data.get('email') or data.get('mobile') or '').strip()
        password = data.get('password', '')

        if not email_or_mobile or not password:
            return jsonify({'success': False, 'message': 'Please provide mobile/email and password'}), 400

        user = None
        if '@' in email_or_mobile:
            user = User.query.filter_by(email=email_or_mobile).first()
        else:
            user = User.query.filter_by(mobile=email_or_mobile).first()

        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({'success': False, 'message': 'Invalid credentials. Please check your username/password.'}), 401

        token = generate_token(user.id)
        return jsonify({
            'success': True,
            'token': token,
            'user': user.to_dict(),
            'message': 'Login successful!'
        })

    @app.route('/api/auth/me', methods=['GET'])
    def me():
        user = get_current_user()
        if not user:
            return jsonify({'success': False, 'message': 'Unauthorized or token expired'}), 401
        return jsonify({
            'success': True,
            'user': user.to_dict()
        })

    # ── Orders ───────────────────────────────────────────────
    @app.route('/api/orders/create', methods=['POST'])
    def create_order():
        data = request.get_json() or {}
        user = get_current_user()
        
        items = data.get('items', [])
        if not items:
            return jsonify({'success': False, 'message': 'Cannot place order with empty cart'}), 400

        order_num = f"SMPS-{datetime.utcnow().strftime('%y%m%d')}-{random.randint(1000, 9999)}"
        
        items_total = sum(float(i.get('price', 0)) * int(i.get('qty', 1)) for i in items)
        # Free delivery above 5000 or 50 rs standard
        delivery_fee = 0.0 if items_total >= 5000 else (50.0 if items_total > 0 else 0.0)
        grand_total = items_total + delivery_fee

        order = Order(
            order_number=order_num,
            user_id=user.id if user else None,
            customer_name=data.get('customer_name') or data.get('name') or (user.full_name if user else 'Devotee'),
            customer_mobile=data.get('customer_mobile') or data.get('phone') or data.get('mobile') or (user.mobile if user else ''),
            customer_email=data.get('customer_email') or data.get('email') or (user.email if user else ''),
            delivery_address=data.get('delivery_address') or data.get('shipping_address') or data.get('address') or 'Store Pickup / Hyderabad',
            city=data.get('city', 'Hyderabad'),
            pincode=data.get('pincode', '500060'),
            payment_method=data.get('payment_method', 'cod'),
            payment_status='paid' if data.get('payment_method') == 'upi' else 'pending',
            order_status='Received',
            items_total=items_total,
            delivery_fee=delivery_fee,
            grand_total=grand_total,
            notes=data.get('notes') or data.get('order_notes') or ''
        )
        db.session.add(order)
        db.session.flush()

        for itm in items:
            p_id = itm.get('id') or 0
            order_item = OrderItem(
                order_id=order.id,
                product_id=p_id,
                product_name=itm.get('name', 'Pooja Item'),
                variant_name=itm.get('variant', ''),
                price=float(itm.get('price', 0)),
                quantity=int(itm.get('qty', 1)),
                subtotal=float(itm.get('price', 0)) * int(itm.get('qty', 1)),
                image=itm.get('image', '')
            )
            db.session.add(order_item)

        db.session.commit()
        return jsonify({
            'success': True,
            'order_id': order.id,
            'order_number': order.order_number,
            'order': order.to_dict(),
            'message': 'Order placed successfully!'
        }), 201

    @app.route('/api/orders', methods=['GET'])
    def get_user_orders():
        user = get_current_user()
        if not user:
            return jsonify({'success': False, 'message': 'Unauthorized'}), 401
            
        orders = Order.query.filter_by(user_id=user.id).order_by(Order.created_at.desc()).all()
        return jsonify({
            'success': True,
            'orders': [o.to_dict() for o in orders]
        })

    @app.route('/api/orders/<int:id>', methods=['GET'])
    def get_order_detail(id):
        order = Order.query.get(id)
        if not order:
            return jsonify({'success': False, 'message': 'Order not found'}), 404
        return jsonify({
            'success': True,
            'order': order.to_dict()
        })

    # ── Reviews ──────────────────────────────────────────────
    @app.route('/api/reviews', methods=['GET', 'POST'])
    def handle_reviews():
        if request.method == 'POST':
            data = request.get_json() or {}
            author_name = (data.get('name') or data.get('user_name') or data.get('author_name') or '').strip()
            comment = (data.get('comment') or data.get('review_text') or data.get('experience') or '').strip()
            rating = int(data.get('rating', 5))
            location = (data.get('location') or data.get('area') or 'Hyderabad').strip()
            
            if not author_name or not comment:
                return jsonify({'success': False, 'message': 'Name and comment are required'}), 400
                
            rev = Review(
                author_name=author_name,
                author_location=location or 'Hyderabad',
                author_avatar='🙏',
                rating=max(1, min(5, rating)),
                comment=comment,
                approved=True
            )
            db.session.add(rev)
            db.session.commit()
            return jsonify({'success': True, 'review': rev.to_dict(), 'message': 'Thank you for your valuable review!'}), 201
            
        reviews = Review.query.filter_by(approved=True).order_by(Review.created_at.desc()).all()
        return jsonify({
            'success': True,
            'reviews': [r.to_dict() for r in reviews]
        })

    # ── Enquiries / Contact ──────────────────────────────────
    @app.route('/api/enquiries', methods=['POST'])
    def create_enquiry():
        data = request.get_json() or {}
        name = (data.get('name') or data.get('customer_name') or '').strip()
        message = (data.get('message') or data.get('enquiry') or '').strip()
        mobile = (data.get('mobile') or data.get('phone') or '').strip()
        subject = data.get('subject', 'General Enquiry')
        
        if not name or not message:
            return jsonify({'success': False, 'message': 'Name and message are required'}), 400
            
        enq = Enquiry(
            name=name,
            mobile=mobile,
            subject=subject,
            message=message
        )
        db.session.add(enq)
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Your message has been received! Our team will contact you shortly.'
        }), 201

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
