from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, ShoppingCart, Motorcycle, User

shopping_cart_routes = Blueprint('cart', __name__)

# 5.1 GET /api/cart – Get Shopping Cart Items
@shopping_cart_routes.route('', methods=['GET'])
@login_required
def get_cart():
  cart_items = ShoppingCart.query.filter(ShoppingCart.user_id == current_user.id).all()
  return jsonify([item.to_dict() for item in cart_items]), 200

# 5.2 POST /api/cart – Add a Motorcycle to Cart
@shopping_cart_routes.route('', methods=['POST'])
@login_required
def add_to_cart():
  data = request.json
  motorcycle_id = data['motorcycle_id']
  cart_item = ShoppingCart(user_id=current_user.id, motorcycle_id=motorcycle_id)
  db.session.add(cart_item)
  db.session.commit()
  return jsonify(cart_item.to_dict()), 201
  


# 5.3 PUT /api/cart/:id – Update Cart Item Quantity
@shopping_cart_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_cart(id):
  cart_item = ShoppingCart.query.get(id)
  if cart_item and cart_item.user_id == current_user.id:
    data = request.json
    cart_item.start_date = data['start_date']
    cart_item.end_date = data['end_date']
    db.session.commit()
    return jsonify(cart_item.to_dict()), 200
  return jsonify({'error': 'Cart item not found'}), 404



# 5.4 DELETE /api/cart/:id – Delete a Cart Item
@shopping_cart_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_cart(id):
  cart_item = ShoppingCart.query.get(id)
  if cart_item and cart_item.user_id == current_user.id:
    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({'message': 'Item deleted successfully'}), 200
  return jsonify({'error': 'Cart item not found'}), 404