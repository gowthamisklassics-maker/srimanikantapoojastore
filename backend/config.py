import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'smps_sacred_secret_key_2026')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///pooja_store.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET = os.environ.get('JWT_SECRET', 'smps_jwt_super_secret_key')
