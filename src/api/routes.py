"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from datetime import datetime

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from api.models import db, Users, Landlords, Flats, Rooms


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

@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if user is None:
        return jsonify({"msg": "Wrong email"}) , 401
    if password != user.password:
        return jsonify({"msg": "Wrong password"}) , 401
    access_token = create_access_token(identity=email)
    response_body['message'] = 'User logged in'
    response_body['access_token'] = access_token
    response_body['results'] = user.serialize()
    return response_body, 200


@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()
    user = Users.query.filter_by(email=body["email"]).first()
    if user is None:
        user = Users(email=body["email"], password=body["password"], is_active=True, is_admin=False)
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "User created"}) , 200
    else:
        return jsonify({"msg": "User already exists"}) , 401


@api.route('/rooms' , methods=['GET'])
def handle_rooms():
    response_body = {}
    room = db.session.execute(db.select(Rooms)).scalars()
    results = [row.serialize() for row in room]  # Utilizo List Comprehension
    response_body['results'] = results
    response_body['message'] = 'Rooms list'
    return response_body, 200
 

@api.route('/rooms' , methods=['POST'])
@jwt_required()
def handle_rooms_post():
    response_body = {}
    data = request.json
    row = Rooms()
    row.title = data['title']
    row.description = data['description']
    row.square_meters = data['square_meters']
    row.price = data['price']
    row.id_flat = data['id_flat']
    row.publication_date = datetime.today()
    row.image_url_1 = data['image_url_1']
    row.image_url_2 = data['image_url_2']
    row.flat_img = data['flat_img']
    db.session.add(row)
    db.session.commit()
    response_body['results'] = row.serialize()
    response_body['message'] = 'Room posted'
    return response_body, 200


@api.route('/universities' , methods=['GET'])
def handle_universities():
    response_body = {}
    university = db.session.execute(db.select(Universities)).scalars()
    results = [row.serialize() for row in university]  # Utilizo List Comprehension
    response_body['results'] = results
    response_body['message'] = 'Universities list'
    return response_body, 200


@api.route('/students' , methods=['GET'])
def handle_students():
    response_body = {}
    student = db.session.execute(db.select(Students)).scalars()
    results = [row.serialize() for row in student]  # Utilizo List Comprehension
    response_body['results'] = results
    response_body['message'] = 'Students list'
    return response_body, 200


@api.route('/students/<int:id>' , methods=['GET', 'PUT'])
def handle_single_student(id):
    response_body = {}
    student = db.session.execute(db.select(Students).where(Students.id == id)).scalars()
    results = [row.serialize() for row in student]  # No es necesario, preguntar en clase
    response_body['results'] = results
    return response_body, 200


""" @api.route('/students' , methods=['PUT'])
# Falta el JWT AUTH
def handle_students_register():
    response_body = {}
    data = request.json
    row = Students()
    row.id_university = data['id_university']
    row.id_user = data['id_user']
    row.name = data['name']
    row.lastname = data['lastname']
    row.birth_date = data['birth_date']
    row.dni = data['dni']
    row.phone_number = data['phone_number']
    row.profile_picture = data['profile_picture']
    db.session.add(row)
    db.session.commit()
    response_body['results'] = row.serialize()
    response_body['message'] = 'Student posted'
    return response_body, 200 """