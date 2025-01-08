from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, Motorcycle

review_routes = Blueprint('reviews', __name__)

# 2.1 GET /api/motorcycles/:id/reviews – Get Reviews for a Motorcycle
@review_routes.route('/motorcycles/<int:motorcycle_id>/reviews', methods=['GET'])
def get_motorcycle_reviews(motorcycle_id):
  motorcycle = Motorcycle.query.get(motorcycle_id)
  if motorcycle is None:
    return jsonify({'error': 'Motorcycle not found'}), 404

  reviews = motorcycle.reviews
  return jsonify([review.to_dict() for review in reviews]), 200

# 2.2 POST /api/motorcycles/:id/reviews – Add a Review
@review_routes.route('/motorcycles/<int:motorcycle_id>/reviews', methods=['POST'])
@login_required
def add_review(motorcycle_id):
  motorcycle= Motorcycle.query.get(motorcycle_id)
  if motorcycle is None:
    return jsonify({'error': 'Motorcycle not found'}), 404

  data = request.json
  review = Review(
    user_id=current_user.id,
    motorcycle_id=motorcycle_id,
    review_text=data['review_text'],
    stars=data['stars']
  )

  db.session.add(review)
  db.session.commit()
  return jsonify(review.to_dict()), 201

# 2.3 PUT /api/reviews/:id – Update a Review
@review_routes.route('/reviews/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
  review = Review.query.get(id)
  if review is None:
    return jsonify({'error': 'Review not found'}), 404

  data = request.json
  review.review_text=data['review_text']
  review.stars=data['stars']
  db.session.commit()
  return jsonify(review.to_dict()), 200

# 2.4 DELETE /api/reviews/:id – Delete a Review
@review_routes.route('/reviews/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
  review = Review.query.get(id)
  if review is None:
    return jsonify({'error': 'Review not found'}), 404

  db.session.delete(review)
  db.session.commit()
  return jsonify({'message': 'Review deleted successfully'}), 200