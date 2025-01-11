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
  created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
  updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

  user = db.relationship('User', back_populates='reviews')
  motorcycle = db.relationship('Motorcycle', back_populates='reviews')

  def to_dict(self):
     return {
      'id': self.id,
      'motorcycle_id': self.motorcycle_id,
      'review_text': self.review_text,
      'stars': self.stars,
      'created_at': self.created_at.isoformat(),
      'updated_at': self.updated_at.isoformat(),
      # 'user': self.user.to_dict(),
      # 'motorcycle': self.motorcycle.to_dict()
      'user': {'id': self.user.id, 'first_name': self.user.first_name, 'last_name': self.user.last_name},
      # 'motorcycle': {'id': self.motorcycle.id, 'year': self.motorcycle.year, 'make': self.motorcycle.make, 'model': self.motorcycle.model}
     }