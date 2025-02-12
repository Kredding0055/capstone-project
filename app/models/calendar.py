from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Calendar(db.Model):
  __tablename__ = 'calendars'
  
  if environment == "production":
    __table_args__ = {'schema': SCHEMA, 'table_args': (db.UniqueConstraint('user_id'),)}
  else:
    __table_args__ = (db.UniqueConstraint('user_id'),)

  id = db.Column(db.Integer, primary_key=True)
  date = db.Column(db.DateTime, nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
  updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)


  events = db.relationship('Event', back_populates='calendar', lazy=True)


class Event(db.Model):
  __tablename__ = 'events'


  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  description = db.Column(db.Text, nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
  updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

  calendar = db.relationship('Calendar', back_populates='events', )
  owner = db.relationship('User', back_populates='events', lazy=True)

