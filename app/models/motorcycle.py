from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Motorcycle(db.Model):
  __tablename__ = 'motorcycles'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}
  
  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  year = db.Column(db.Integer, nullable=False)
  make = db.Column(db.Text, nullable=False)
  model = db.Column(db.Text, nullable=False)
  color = db.Column(db.Text, nullable=False)
  price = db.Column(db.Integer, nullable=False)
  miles = db.Column(db.Integer, nullable=False)
  city = db.Column(db.Text, nullable=False)
  state = db.Column(db.Text, nullable=False)
  description = db.Column(db.Text, nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())


  owner = db.relationship('User', back_populates='motorcycles', lazy=True)
  images = db.relationship('MotorcycleImages', back_populates='motorcycle', cascade='all, delete-orphan', lazy=True)
  favorited_by = db.relationship('User', secondary='favorites', cascade='all, delete-orphan', lazy=True)
  shopping_carts = db.relationship('ShoppingCart', back_populates='motorcycle', cascade='all, delete-orphan')
  reviews = db.relationship('Review', back_populates='motorcycle', cascade='all, delete-orphan')

class MotorcycleImages(db.Model):
  __tablename__ = 'motorcycle_images'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  motorcycle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('motorcycles.id')), nullable=False)
  image_url = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())


  motorcycle = db.relationship('Motorcycle', back_populates='images', lazy=True)