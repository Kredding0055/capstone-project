from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Review(db.Model):
  __tablename__ = 'reviews'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  motorcycle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('motorcycles.id')), nullable=False)
  review_text = db.Column(db.Text, nullable=False)
  stars = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.current_timestamp(), nullable=False)
  updated_at = db.Column(db.DateTime, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=False)

  user = db.relationship('User', back_populates='reviews')
  motorcycle = db.relationship('Motorcycle', back_populates='reviews')