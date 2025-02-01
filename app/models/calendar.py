from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Calendar(db.Model):
  __tablename__ = 'calendars'