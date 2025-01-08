from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, ShoppingCart, Motorcycle, User

shopping_cart_routes = Blueprint('cart', __name__)

# 5.1 GET /api/cart – Get Shopping Cart Items
@shopping_cart_routes.route('/', methods=['GET'])
def get_cart():


# 5.2 POST /api/cart – Add a Motorcycle to Cart
@shopping_cart_routes.route('/', methods=['POST'])


# 5.3 PUT /api/cart/:id – Update Cart Item Quantity


# 5.4 DELETE /api/cart/:id – Delete a Cart Item