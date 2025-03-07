from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class ShoppingCart(db.Model):
  __tablename__ = 'shopping_carts'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  start_date = db.Column(db.String, nullable=False)
  end_date = db.Column(db.String, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  motorcycle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('motorcycles.id')), nullable=False)

  user = db.relationship('User', back_populates='shopping_carts')
  motorcycle = db.relationship('Motorcycle', back_populates='shopping_carts')

  def to_dict(self):
    return {
      'id': self.id,
      'start_date': self.start_date,
      'end_date': self.end_date,
      'user_id': self.user_id,
      'motorcycle_id': self.motorcycle_id,
      'motorcycle': self.motorcycle.to_dict()
    }