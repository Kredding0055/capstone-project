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
  images = db.relationship('MotorcycleImage', back_populates='motorcycle', cascade='all, delete-orphan', lazy=True)
  favorited_by = db.relationship('User', secondary='favorites', back_populates='favorited_motorcycles', cascade='all, delete', lazy=True)
  shopping_carts = db.relationship('ShoppingCart', back_populates='motorcycle', cascade='all, delete-orphan')
  reviews = db.relationship('Review', back_populates='motorcycle', cascade='all, delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'owner_id': self.owner_id,
      'year': self.year,
      'make': self.make,
      'model': self.model,
      'color': self.color,
      'price': self.price,
      'miles': self.miles,
      'city': self.city,
      'description': self.description,
      "created_at": self.created_at.isoformat(),
      "updated_at": self.updated_at.isoformat(),
      'owner': self.owner.to_dict(),
      'images': [image.to_dict() for image in self.images],
      'favorited_by': [user.to_dict() for user in self.favorited_by],
      'shopping_carts': [cart.to_dict() for cart in self.shopping_carts],
      'reviews': [review.to_dict() for review in self.reviews]
    }

class MotorcycleImage(db.Model):
  __tablename__ = 'motorcycle_images'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  motorcycle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('motorcycles.id')), nullable=False)
  image_url = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())


  motorcycle = db.relationship('Motorcycle', back_populates='images', lazy=True)

  def to_dict(self):
    return {
      'id': self.id,
      'motorcycle_id': self.motorcycle_id,
      'image_url': self.image_url,
      'created_at': self.created_at.isoformat(),
      'updated_at': self.updated_at.isoformat()
    }