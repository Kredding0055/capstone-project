from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import func


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)


    motorcycles = db.relationship('Motorcycle', back_populates='owner', cascade='all, delete-orphan', lazy=True)
    favorited_motorcycles = db.relationship('Motorcycle', secondary='favorites', cascade='all, delete-orphan', lazy=True)
    shopping_carts = db.relationship('ShoppingCart', back_populates='user', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        member_since = self.created_at.strftime("%B %Y")
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'motorcycles': [motorcycle.to_dict() for motorcycle in self.motorcycles],
            'favorited_motorcycles': [motorcycle.to_dict() for motorcycle in self.favorited_motorcycles],
            'shopping_carts': [cart.to_dict() for cart in self.shopping_carts],
            'reviews': [review.to_dict() for review in self.reviews]
        }
