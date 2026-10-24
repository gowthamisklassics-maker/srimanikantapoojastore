from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    telugu = db.Column(db.String(100), default='')
    img = db.Column(db.String(255), default='')
    desc = db.Column(db.Text, default='')
    emoji = db.Column(db.String(10), default='🕉️')
    count = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'telugu': self.telugu,
            'img': self.img,
            'desc': self.desc,
            'emoji': self.emoji,
            'count': self.count
        }

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), db.ForeignKey('categories.id'), nullable=False)
    category_name = db.Column(db.String(100), default='')
    name = db.Column(db.String(200), nullable=False)
    telugu = db.Column(db.String(200), default='')
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float, default=0)
    rating = db.Column(db.Float, default=5.0)
    reviews = db.Column(db.Integer, default=0)
    image = db.Column(db.String(255), default='')
    images_json = db.Column(db.Text, default='[]')
    description = db.Column(db.Text, default='')
    sizes_json = db.Column(db.Text, default='[]')
    tags_json = db.Column(db.Text, default='[]')
    badge = db.Column(db.String(50), nullable=True)
    in_stock = db.Column(db.Boolean, default=True)
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        try:
            images = json.loads(self.images_json) if self.images_json else [self.image]
        except:
            images = [self.image]
        try:
            sizes = json.loads(self.sizes_json) if self.sizes_json else []
        except:
            sizes = []
        try:
            tags = json.loads(self.tags_json) if self.tags_json else []
        except:
            tags = []
            
        return {
            'id': self.id,
            'category': self.category,
            'categoryName': self.category_name,
            'name': self.name,
            'telugu': self.telugu,
            'price': self.price,
            'originalPrice': self.original_price,
            'rating': self.rating,
            'reviews': self.reviews,
            'image': self.image,
            'images': images,
            'description': self.description,
            'sizes': sizes,
            'tags': tags,
            'badge': self.badge,
            'inStock': self.in_stock,
            'featured': self.featured
        }

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    mobile = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'mobile': self.mobile,
            'created_at': self.created_at.isoformat()
        }

class Address(db.Model):
    __tablename__ = 'addresses'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    mobile = db.Column(db.String(20), nullable=False)
    address_line = db.Column(db.String(255), nullable=False)
    locality = db.Column(db.String(100), default='')
    landmark = db.Column(db.String(100), default='')
    city = db.Column(db.String(100), default='Hyderabad')
    pincode = db.Column(db.String(10), default='500062')
    is_default = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'mobile': self.mobile,
            'address_line': self.address_line,
            'locality': self.locality,
            'landmark': self.landmark,
            'city': self.city,
            'pincode': self.pincode,
            'is_default': self.is_default
        }

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(30), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_mobile = db.Column(db.String(20), nullable=False)
    customer_email = db.Column(db.String(100), nullable=True)
    delivery_address = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(100), default='Hyderabad')
    pincode = db.Column(db.String(10), default='500062')
    payment_method = db.Column(db.String(50), default='cod') # 'cod', 'upi', 'whatsapp'
    payment_status = db.Column(db.String(50), default='pending') # 'pending', 'paid', 'verified'
    order_status = db.Column(db.String(50), default='Processing')
    items_total = db.Column(db.Float, default=0.0)
    delivery_fee = db.Column(db.Float, default=0.0)
    grand_total = db.Column(db.Float, default=0.0)
    notes = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    items = db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'order_number': self.order_number,
            'user_id': self.user_id,
            'customer_name': self.customer_name,
            'customer_mobile': self.customer_mobile,
            'customer_email': self.customer_email,
            'delivery_address': self.delivery_address,
            'city': self.city,
            'pincode': self.pincode,
            'payment_method': self.payment_method,
            'payment_status': self.payment_status,
            'order_status': self.order_status,
            'items_total': self.items_total,
            'delivery_fee': self.delivery_fee,
            'grand_total': self.grand_total,
            'notes': self.notes,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M'),
            'items': [item.to_dict() for item in self.items]
        }

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    product_name = db.Column(db.String(200), nullable=False)
    variant_name = db.Column(db.String(100), default='')
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, default=1)
    subtotal = db.Column(db.Float, nullable=False)
    image = db.Column(db.String(255), default='')

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'product_name': self.product_name,
            'variant_name': self.variant_name,
            'price': self.price,
            'quantity': self.quantity,
            'subtotal': self.subtotal,
            'image': self.image
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, nullable=True)
    author_name = db.Column(db.String(100), nullable=False)
    author_location = db.Column(db.String(100), default='Hyderabad')
    author_avatar = db.Column(db.String(20), default='🙏')
    rating = db.Column(db.Integer, default=5)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    approved = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'author_name': self.author_name,
            'author_location': self.author_location,
            'author_avatar': self.author_avatar,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at.strftime('%d %b %Y')
        }

class Enquiry(db.Model):
    __tablename__ = 'enquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    mobile = db.Column(db.String(20), default='')
    subject = db.Column(db.String(100), default='General Enquiry')
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'mobile': self.mobile,
            'subject': self.subject,
            'message': self.message,
            'created_at': self.created_at.isoformat()
        }
