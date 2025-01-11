from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Favorite, Motorcycle, MotorcycleImage 

favorite_routes = Blueprint('favorites', __name__)

# 4.1 GET /api/favorites – Get Favorite Motorcycles
@favorite_routes.route('', methods=['GET'])
@login_required
def get_favorites():
  favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
  return jsonify([favorite.to_dict() for favorite in favorites])

# 4.2 POST /api/favorites – Add a Favorite Motorcycle
@favorite_routes.route('', methods=['POST'])
@login_required
def add_favorite():
  data = request.json
  motorcycle_id = data.get('motorcycle_id')

  if not motorcycle_id:
    return jsonify({'message': 'Motorcycle ID is required'}), 400

  motorcycle = Motorcycle.query.get(motorcycle_id)
  if not motorcycle:
    return jsonify({'message': 'Motorcycle not found'}), 404

  favorite = Favorite.query.filter(Favorite.user_id == current_user.id, Favorite.motorcycle_id == motorcycle_id).first()
  if favorite:
    return jsonify({'error': 'Motorcycle is already favorited'})

  favorite = Favorite(user_id=current_user.id, motorcycle_id=motorcycle_id)
  db.session.add(favorite)
  db.session.commit()
  return jsonify(favorite.to_dict())

# 4.3 DELETE /api/favorites/:id – Delete a Favorite Motorcycle
@favorite_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_favorite(id):
  favorite = Favorite.query.get(id)
  if not favorite:
    return jsonify({'error': 'Favorite not found'}), 404

  if favorite.user_id != current_user.id:
    return jsonify({'error': 'Unauthorized'}), 401

  db.session.delete(favorite)
  db.session.commit()
  return jsonify({'message': 'Favorite deleted successfully'}), 200