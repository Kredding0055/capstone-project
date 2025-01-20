from flask import Blueprint, jsonify, request, send_from_directory
from flask_login import login_required, current_user
from app.models import db, Motorcycle, MotorcycleImage

motorcycle_routes = Blueprint('motorcycles', __name__)

# 1.1 GET /api/motorcycles – Get All Motorcycles
@motorcycle_routes.route('', methods=['GET'])
def get_all_motorcycles():
  motorcycles = Motorcycle.query.all()
  return jsonify([motorcycle.to_dict() for motorcycle in motorcycles]), 200

# 1.2 GET /api/motorcycles/:id – Get Motorcycle Details
@motorcycle_routes.route('/<int:id>', methods=['GET'])
def get_motorcycle_details(id):
  motorcycle = Motorcycle.query.get(id)
  if motorcycle is None:
    return jsonify({'error': 'Motorcycle not found'}), 404
  return jsonify(motorcycle.to_dict()), 200

# 1.3 POST /api/motorcycles – Create a New Motorcycle
@motorcycle_routes.route('', methods=['POST'])
@login_required
def create_motorcycle():
  data = request.json
  motorcycle = Motorcycle(
    owner_id=current_user.id,
    year=data['year'],
    make=data['make'],
    model=data['model'],
    color=data['color'],
    price=data['price'],
    miles=data['miles'],
    city=data['city'],
    state=data['state'],
    description=data['description']
  )
  db.session.add(motorcycle)
  db.session.commit()
  return jsonify(motorcycle.to_dict()), 201

# 1.4 PUT /api/motorcycles/:id – Update a Motorcycle
@motorcycle_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_motorcycle(id):
  motorcycle = Motorcycle.query.get(id)
  if motorcycle is None:
    return jsonify({'error': 'Motorcycle not found'}), 404
  if motorcycle.owner_id != current_user.id:
    return jsonify({'error': 'Unauthorized'}), 403
  
  data = request.json
  motorcycle.year=data['year']
  motorcycle.make=data['make']
  motorcycle.model=data['model']
  motorcycle.color=data['color']
  motorcycle.price=data['price']
  motorcycle.miles=data['miles']
  motorcycle.city=data['city']
  motorcycle.state=data['state']
  motorcycle.description=data['description']
  db.session.commit()
  return jsonify(motorcycle.to_dict()), 200

# 1.5 DELETE /api/motorcycles/:id – Delete a Motorcycle
@motorcycle_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_motorcycle(id):
  motorcycle = Motorcycle.query.get(id)
  if motorcycle is None:
    return jsonify({'error': 'Motorcycle not found'}), 404
  if motorcycle.owner_id != current_user.id:
    return jsonify({'error': 'Unauthorized'}), 403
  db.session.delete(motorcycle)
  db.session.commit()
  return jsonify({'message': 'Motorcycle deleted successfully'}), 200

@motorcycle_routes.route('/images/<path:path>')
def serve_image(path):
  return send_from_directory('react-vite/public/images', path)

# 3.1 GET /api/motorcycles/:id/images - Get all Images for a motorcycle
@motorcycle_routes.route('/<int:id>/images', methods=['GET'])
def get_motorcycle_images(id):
  motorcycle = Motorcycle.query.get(id)
  if motorcycle is None:
    return jsonify({'error': 'Motorcycle not found'}), 404
  return jsonify([image.to_dict() for image in motorcycle.images]), 200

# 3.2 POST /api/motorcycles/:id/images - Post a new image for a motorcycle
@motorcycle_routes.route('<int:id>/images', methods=['POST'])
@login_required
def post_images(id):
  motorcycle = Motorcycle.query.get(id)
  if motorcycle is None:
    return jsonify({'error': 'Motorcycle not found'}), 404
  if motorcycle.owner_id != current_user.id:
    return jsonify({'error': 'Unauthorized'}), 403
  
  # data = request.json
  # new_image = MotorcycleImage(
  #   motorcycle_id=id,
  #   image_url=data['image_url']
  # )
  # db.session.add(new_image)
  data = request.json
  for image_data in data:
    new_image = MotorcycleImage(
      motorcycle_id=id,
      image_url=image_data['url']
    )
    db.session.add(new_image)
  db.session.commit()
  return jsonify(new_image.to_dict()), 201

# 3.3 DELETE /api/motorcycles/:id/images/:id - Delete an Image for a motorcycle
@motorcycle_routes.route('/<int:motorcycle_id>/images/<int:image_id>')
@login_required
def delete_image(motorcycle_id, image_id):
  motorcycle = Motorcycle.query.get(motorcycle_id)
  if motorcycle is None:
    return jsonify({'error': 'Motorcycle not found'}), 404
  if motorcycle.owner_id != current_user.id:
    return jsonify({'error': 'Unauthorized'}), 403

  image = MotorcycleImage.query.get(image_id)
  if image is None:
    return jsonify({'error': 'Image not found'}), 404

  db.session.delete(image)
  db.session.commit()
  return jsonify({'message': 'Image deleted successfully'}), 200