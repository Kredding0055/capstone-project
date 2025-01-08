from flask import Blueprint, 

motorcycle_routes = Blueprint('motorcycles', __name__)


@motorcycle_routes.route('/')
def get_all_motorcycles():
  