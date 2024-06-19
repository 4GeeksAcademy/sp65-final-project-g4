"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Landlords, Flats


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return jsonify(response_body), 200


@api.route('/users', methods=['GET'])
def handle_users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Usuarios'
        return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            response_body['results'] = user.serialize()
            response_body['message'] = 'Usuario encontrado'
            return response_body, 200
        response_body['message'] = 'Usario inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            user.email = data['email']
            user.is_active = data['is_active']
            user.is_admin = data['is_admin']
            user.is_landlord = data['is_landlord']
            db.session.commit()
            response_body['message'] = 'Datos del usuario actualizados'
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = 'Usario inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            user.is_active = False
            db.session.commit()
            response_body['message'] = 'Usuario eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Usuario inexistente'
        response_body['results'] = {}
        return response_body, 200


@api.route('/landlords', methods=['GET'])
def handle_landlords():
    response_body = {}
    landlords = db.session.execute(db.select(Landlords)).scalars()
    results = [row.serialize() for row in landlords]
    response_body['results'] = results
    response_body['message'] = 'Landlord list'
    return response_body, 200


@api.route('/landlords', methods=['POST'])
@jwt_required()
def handle_landlords_post():
    response_body = {}
    data = request.json
    landlord = Landlords()
    landlord.name = data['name']
    landlord.lastname = data['lastname']
    landlord.birth_date = data['birth_date']
    landlord.id_user = data['id_user']
    landlord.dni = data['dni']
    landlord.phone_number = data['phone_number']
    landlord.profile_picture = data['profile_picture']
    db.session.add(landlord)
    db.session.commit()
    response_body['results'] = landlord.serialize()
    response_body['message'] = 'Landlord posted'
    return response_body, 200


@api.route('/landlords/<int:landlord_id>', methods=['GET'])
def handle_landlord(landlord_id):
    response_body = {}
    landlord = db.session.execute(db.select(Landlords).where(Landlords.id == landlord_id)).scalar()
    if landlord:
        response_body['results'] = landlord.serialize()
        response_body['message'] = 'Landlord found'
        return response_body, 200
    response_body['message'] = 'Landlord not found'
    response_body['results'] = {}
    return response_body, 404


@api.route('/landlords/<int:landlord_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_landlord_edit(landlord_id):
    response_body = {}
    landlord = db.session.execute(db.select(Landlords).where(Landlords.id == landlord_id)).scalar()
    if request.method == 'PUT':
        data = request.json
        if landlord:
            landlord.name = data['name']
            landlord.lastname = data['lastname']
            landlord.birth_date = data['birth_date']
            landlord.id_user = data['id_user']
            landlord.dni = data['dni']
            landlord.phone_number = data['phone_number']
            landlord.profile_picture = data['profile_picture']
            db.session.commit()
            response_body['message'] = 'Landlord updated'
            response_body['results'] = landlord.serialize()
            return response_body, 200
        response_body['message'] = 'Landlord not found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        if landlord:
            db.session.delete(landlord)
            db.session.commit()
            response_body['message'] = 'Landlord deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Landlord not found'
        response_body['results'] = {}
        return response_body, 404


@api.route('/flats', methods=['GET'])
def handle_flats():
    response_body = {}
    flat = db.session.execute(db.select(Flats)).scalars()
    results = [row.serialize() for row in flat]  # Utilizo List Comprehension
    response_body['results'] = results
    response_body['message'] = 'Flats list'
    return response_body, 200



@api.route('/flats', methods=['POST'])
@jwt_required()
def handle_flats_post():
    response_body = {}
    data = request.json
    flat = Flats()
    flat.address = data['address']
    flat.description = data['description']
    flat.longitude = data['longitude']
    flat.latitude = data['latitude']
    flat.id_landlord = data['id_landlord']
    db.session.add(flat)
    db.session.commit()
    response_body['results'] = flat.serialize()
    response_body['message'] = 'Flats posted'
    return response_body, 200


@api.route('/flats/<int:flat_id>', methods=['GET'])
def handle_flat(flat_id):
    response_body = {}
    if flat:
        response_body['results'] = flat.serialize()
        response_body['message'] = 'Flat found'
        return response_body, 200
    response_body['message'] = 'Flat not found'
    response_body['results'] = {}
    return response_body, 404


@api.route('/flats/<int:flat_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_flat_edit(flat_id):
    response_body = {}
    flat = db.session.execute(db.select(Flats).where(Flats.id == flat_id)).scalar()
    if request.method == 'PUT':
        data = request.json
        if flat:
            flat.title = data['title']
            flat.description = data['description']
            flat.square_meters = data['square_meters']
            flat.price = data['price']
            flat.id_flat = data['id_flat']
            flat.publication_date = datetime.today()
            flat.image_url_1 = data['image_url_1']
            flat.image_url_2 = data['image_url_2']
            flat.flat_img = data['flat_img']
            db.session.commit()
            response_body['message'] = 'Flat updated'
            response_body['results'] = flat.serialize()
            return response_body, 200
        response_body['message'] = 'Flat not found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        if flat:
            db.session.delete(flat)
            db.session.commit()
            response_body['message'] = 'Flat deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Flat not found'
        response_body['results'] = {}
        return response_body, 404