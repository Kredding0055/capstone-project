from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func


class Favorite(db.Model):
  __tablename__ = 'favorites'

  # if environment == "production":
  #   __table_args__ = {'schema': SCHEMA}

  if environment == "production":
    __table_args__ = {'schema': SCHEMA, 'table_args': (db.UniqueConstraint('user_id', 'motorcycle_id'),)}
  else:
    __table_args__ = (db.UniqueConstraint('user_id', 'motorcycle_id'),)

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  motorcycle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('motorcycles.id')), nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now())

  # __table_args__ = (db.UniqueConstraint('user_id', 'motorcycle_id'),)


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'motorcycle_id': self.motorcycle_id,
      'created_at': self.created_at.isoformat()
    }