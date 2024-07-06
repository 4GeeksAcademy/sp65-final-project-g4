"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users , Rooms , Albums , Favorites , Students , Landlords, Universities, Flats, Chats, Messages
import cloudinary
import cloudinary.uploader
import cloudinary.api

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager



api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return jsonify(response_body), 200


@api.route("/signupstudents", methods=["POST"])
def signup_students():
    response_body = {}
    body = request.get_json()
    email = body["email"].lower()
    user = Users.query.filter_by(email=email).first()
    if user is None:
        user = Users(email=body["email"], password=body["password"], is_active=True, is_admin=False, is_student=True, is_landlord=False)
        db.session.add(user)
        db.session.commit()
        name = body.get("name" , " ")
        lastname = body.get("lastname" , " ")
        dni = body.get("dni" , " ")
        student = Students(name=name, lastname=lastname, dni=dni, id_user=user.id, id=id)
        db.session.add(student)
        db.session.commit()
        access_token = create_access_token(identity={'user_id': user.id,
                                                     'user_is_student': True,
                                                     'user_is_landlord': False,
                                                     'email': user.email,
                                                     'student_id': student.id})
        response_body['access_token'] = access_token
        response_body['data'] = {**user.serialize() , **student.public_serialize()}
        response_body['message'] = 'Student created and logged in'
        return response_body , 200
    else:
        return jsonify({"msg": "Student already exists"}) , 401


@api.route("/signuplandlords", methods=["POST"])
def signup_landlords():
    response_body = {}
    body = request.get_json()
    user = Users.query.filter_by(email=body["email"].lower()).first()
    if user is None:
        user = Users(email=body["email"], 
                     password=body["password"], 
                     is_active=True, 
                     is_admin=False, 
                     is_student=False, 
                     is_landlord=True)
        db.session.add(user)
        db.session.commit()
        name = body.get("name" , " ")
        lastname = body.get("lastname" , " ")
        dni = body.get("dni" , " ")
        landlord = Landlords(name=name, 
                             lastname=lastname, 
                             dni=dni, 
                             id_user=user.id,
                             id=id)
        db.session.add(landlord)
        db.session.commit()
        access_token = create_access_token(identity={'user_id': user.id,
                                                     'user_is_student': False,
                                                     'user_is_landlord': True,
                                                     'email': user.email,
                                                     'landlord_id': landlord.id})
        response_body['data'] = {**user.serialize() , **landlord.public_serialize()}
        response_body['access_token'] = access_token
        response_body['message'] = 'Landlord created and logged in'
        print(response_body)
        return response_body , 200
    return jsonify({"msg": "Landlord already exists"}) , 401


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    print(user)
    print(user.serialize())
    if user is None:
        return jsonify({"msg": "Wrong email"}) , 401
    if password != user.password:
        return jsonify({"msg": "Wrong password"}) , 401
    if user.is_student:
        student = db.session.execute(db.select(Students).where(Students.id_user == user.id)).scalar()
        access_token = create_access_token(identity={'user_id': user.id,
                                                     'user_is_student': True,
                                                     'user_is_landlord': False,
                                                     'email': user.email,
                                                     'student_id': student.id})
        serialized_data = {**user.serialize(), **student.public_serialize()}
        response_body['message'] = 'Student logged in'
        response_body['access_token'] = access_token
        response_body['data'] = serialized_data
        return response_body, 200
    if user.is_landlord:
        landlord = db.session.execute(db.select(Landlords).where(Landlords.id_user == user.id)).scalar()
        access_token = create_access_token(identity={'user_id': user.id,
                                                     'user_is_student': False,
                                                     'user_is_landlord': True,
                                                     'email': user.email,
                                                     'landlord_id': landlord.id})
        serialized_data = {**user.serialize(), **landlord.public_serialize()}
        response_body['message'] = 'Landlord logged in'
        response_body['access_token'] = access_token
        response_body['data'] = serialized_data
        return response_body, 200


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


@api.route('/landlords/<int:id>', methods=['GET'])
def handle_landlord(id):
    response_body = {}
    landlord = db.session.execute(db.select(Landlords).where(Landlords.id == id)).scalar()
    user = db.session.execute(db.select(Users).where(Users.id == Landlords.id_user)).scalar()

    if landlord:
        response_body['results'] = {**user.serialize(), **landlord.serialize()}
        response_body['message'] = 'Landlord found'
        return response_body, 200
    response_body['message'] = 'Landlord not found'
    response_body['results'] = {}
    return response_body, 404


@api.route('/landlords/<int:id>', methods=['PUT', 'DELETE'])
def handle_landlord_edit(id):
    response_body = {}
    landlord = db.session.execute(db.select(Landlords).where(Landlords.id == id)).scalar()
    user = db.session.execute(db.select(Users).where(Users.id == Landlords.id_user)).scalar()

    if request.method == 'PUT':
        data = request.json
        if landlord:
            landlord.name = data['name']
            landlord.lastname = data['lastname']
            landlord.birth_date = data['birth_date']
            landlord.dni = data['dni']
            landlord.phone_number = data['phone_number']
            landlord.profile_picture = data['profile_picture']
            db.session.commit()
            response_body['message'] = 'Landlord updated'
            response_body['results'] = {**user.serialize(), **landlord.public_serialize()}
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
    user_info = get_jwt_identity()
    current_landlord = user_info['landlord_id']
    data = request.json
    flat = Flats()
    flat.address = data['address']
    flat.description = data['description']
    flat.postal_code = data['postal_code']
    flat.city = data['city']
    flat.id_landlord = current_landlord
    db.session.add(flat)
    db.session.commit()
    response_body['results'] = flat.serialize()
    response_body['message'] = 'Flat posted'
    return response_body, 200


@api.route('/flats/<int:flat_id>', methods=['GET'])
def handle_flat(flat_id):
    response_body = {}
    flat = db.session.execute(db.select(Flats).where(Flats.id == flat_id)).scalar()
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
            flat.description = data['description']
            flat.id_landlord = data['id_landlord']
            flat.address = data['address']
            flat.postal_code = data['postal_code']
            flat.city = data['address']
            flat.id_album = data.get('album_id', flat.album_id)
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


@api.route('/rooms/<int:room_id>', methods=['GET'])
def handle_room(room_id):
    response_body = {}
    room = db.session.execute(db.select(Rooms).where(Rooms.id == room_id)).scalar()
    if room:
        response_body['results'] = room.serialize()
        response_body['message'] = 'Room found'
        return response_body, 200
    response_body['message'] = 'Room not found'
    response_body['results'] = {}
    return response_body, 404
    
    
@api.route('/rooms/<int:room_id>', methods=['PUT' , 'DELETE'])
@jwt_required()
def handle_room_id(room_id):
    response_body = {}
    if request.method == 'PUT':
        data = request.json
        print(data)
        room = db.session.execute(db.select(Rooms).where(Rooms.id == room_id)).scalar()
        if room:
            room.title = data['title']
            room.description = data['description']
            room.square_meters = data['square_meters']
            room.price = data['price']
            room.id_flat = data['id_flat']
            room.publication_date = datetime.today()
            room.image_url_1 = data['image_url_1']
            room.image_url_2 = data['image_url_2']
            room.flat_img = data['flat_img']
            db.session.commit()
            response_body['message'] = 'Room updated'
            response_body['results'] = room.serialize()
            return response_body, 200
        response_body['message'] = 'Room not found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        room = db.session.execute(db.select(Rooms).where(Rooms.id == room_id)).scalar()
        if room:
            db.session.delete(room)
            db.session.commit()
            response_body['message'] = 'Room deleted'
            response_body['results'] = {}
        response_body['message'] = 'Room deleted'
        response_body['results'] = {}
        return response_body, 200


@api.route('/albums' , methods=['GET'])
def handle_albums():
    response_body = {}
    album = db.session.execute(db.select(Albums)).scalars()
    results = [row.serialize() for row in album] 
    response_body['results'] = results
    response_body['message'] = 'Albums list'
    return response_body, 200


@api.route('/albums' , methods=['POST'])
@jwt_required()
def handle_albums_post():
    response_body = {}
    data = request.json
    row = Albums()
    row.url_album_cloudinary = data['url_album_cloudinary']
    db.session.add(row)
    db.session.commit()
    response_body['results'] = row.serialize()
    response_body['message'] = 'Album posted'
    return response_body, 200


@api.route('/albums/<int:album_id>', methods=['GET'])
def handle_album(album_id):
    response_body = {}
    album = db.session.execute(db.select(Albums).where(Albums.id == album_id)).scalar()
    if album:
        response_body['results'] = album.serialize()
        response_body['message'] = 'Album found'
        return response_body, 200
    response_body['message'] = 'Album not found'
    response_body['results'] = {}
    return response_body, 404
    
    
@api.route('/albums/<int:album_id>', methods=['PUT' , 'DELETE'])
@jwt_required()
def handle_album_id(album_id):
    response_body = {}
    if request.method == 'PUT':
        data = request.json
        print(data)
        album = db.session.execute(db.select(Albums).where(Albums.id == album_id)).scalar()
        if album:
            album.id_flat = data['id_flat']
            album.url_photo = data['url_photo']
            db.session.commit()
            response_body['message'] = 'Album updated'
            response_body['results'] = album.serialize()
            return response_body, 200
        response_body['message'] = 'Album not found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        album = db.session.execute(db.select(Albums).where(Albums.id == album_id)).scalar()
        if album:
            db.session.delete(album)
            db.session.commit()
            response_body['message'] = 'Album deleted'
            response_body['results'] = {}
        response_body['message'] = 'Album not found'
        response_body['results'] = {}
        return response_body, 200


@api.route('/favorites' , methods=['GET'])
def handle_favorites():
    response_body = {}
    favorite = db.session.execute(db.select(Favorites)).scalars()
    results = [row.serialize() for row in favorite] 
    response_body['results'] = results
    response_body['message'] = 'Favorites list'
    return response_body, 200
 

@api.route('/favorites' , methods=['POST'])
@jwt_required()
def handle_favorites_post():
    response_body = {}
    data = request.json
    row = Favorites()
    row.id_student = data['id_student']
    row.id_room = data['id_room']
    db.session.add(row)
    db.session.commit()
    response_body['results'] = row.serialize()
    response_body['message'] = 'Favorite saved'
    return response_body, 200

    
@api.route('/favorites/<int:favorite_id>', methods=['PUT' , 'DELETE' , 'GET'])
@jwt_required()
def handle_favorite_id(favorite_id):
    response_body = {}
    if request.method == 'PUT':
        data = request.json
        print(data)
        favorite = db.session.execute(db.select(Favorites).where(Favorites.id == favorite_id)).scalar()
        if favorite:
            favorite.id_student = data['id_student']
            favorite.id_room = data['id_room']
            db.session.commit()
            response_body['message'] = 'Favorite updated'
            response_body['results'] = favorite.serialize()
            return response_body, 200
        response_body['message'] = 'Favorite not found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        favorite = db.session.execute(db.select(Favorites).where(Favorites.id == favorite_id)).scalar()
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
            response_body['message'] = 'Favorite deleted'
            response_body['results'] = {}
        response_body['message'] = 'Favorite not found'
        response_body['results'] = {}
        return response_body, 200
    if request.method == 'GET':
        favorite = db.session.execute(db.select(Favorites).where(Favorites.id == favorite_id)).scalar()
        if favorite:
            response_body['results'] = favorite.serialize()
            response_body['message'] = 'Favorite found'
            return response_body, 200
        response_body['message'] = 'Favorite not found'
        response_body['results'] = {}
        return response_body, 404


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


@api.route('/students/<int:id>' , methods=['GET'])
def handle_single_student(id):
    response_body = {}
    student = db.session.execute(db.select(Students).where(Students.id == id)).scalar()
    user = db.session.execute(db.select(Users).where(Users.id == Students.id_user)).scalar()
    if student:
        serialized_data = {**user.serialize(), **student.public_serialize()}
        response_body['results'] = serialized_data
        return response_body, 200
    response_body['message'] = 'ID estudiante inexistente'
    response_body['results'] = {}
    return response_body, 404


@api.route('/students/<int:id>' , methods=['PUT', 'DELETE'])
def modify_single_student(id):
    response_body = {}
    if request.method == 'PUT':
        data = request.json
        student = db.session.execute(db.select(Students).where(Students.id == id)).scalar()
        user = db.session.execute(db.select(Users).where(Users.id == Students.id_user)).scalar()
        if student:
            student.id_university = data['id_university']
            student.name = data['name']
            student.lastname = data['lastname']
            student.birth_date = data['birth_date']
            student.dni = data['dni']
            student.phone_number = data['phone_number']
            student.profile_picture = data['profile_picture']
            db.session.commit()
            response_body['message'] = 'Datos del estudiante actualizados'
            response_body['results'] = {**user.serialize(), **student.public_serialize()}
            return response_body, 200
        response_body['message'] = 'ID estudiante inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        student = db.session.execute(db.select(Students).where(Students.id == id)).scalar()
        if student:
            db.session.delete(student)
            db.session.commit()
            response_body['message'] = 'Student deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Student not found'
        response_body['results'] = {}
        return response_body, 404


@api.route('/photo', methods=['POST'])
@jwt_required()
def upload_photo():
    user_info = get_jwt_identity()
    response_body = {}
    img = request.files["img"]
    folder_path = f"users/{user_info['user_id']}"
    img_url = cloudinary.uploader.upload(img, folder=folder_path)
    response_body["img_url"] = img_url["url"]
    response_body['message'] = "Sucessful upload"
    return response_body , 200
    

@api.route('/images/<user_id>', methods=['GET'])
def get_images(user_id):
    folder_path = f"users/{user_id}"
    resources = cloudinary.api.resources(
        type='upload',
        prefix=folder_path,
        max_results=100
    )
    image_urls = [resource['secure_url'] for resource in resources['resources']]
    return jsonify({"urls": image_urls}), 200

@api.route('/photoflats/<flat_id>', methods=['POST'])
@jwt_required()
def upload_photo_flats(flat_id):
    user_info = get_jwt_identity()
    response_body = {}
    img = request.files["img"]
    folder_path = f"flats/{flat_id}"
    img_url = cloudinary.uploader.upload(img, folder=folder_path)
    response_body["img_url"] = img_url["url"]
    response_body['message'] = "Sucessful upload"
    return response_body , 200

@api.route('/imagesflats/<flat_id>', methods=['GET'])
def get_images_flats(flat_id):
    folder_path = f"flats/{flat_id}"
    resources = cloudinary.api.resources(
        type='upload',
        prefix=folder_path,
        max_results=100
    )
    image_urls = [resource['secure_url'] for resource in resources['resources']]
    return jsonify({"urls": image_urls}), 200

@api.route('/chats' , methods=['GET'])
@jwt_required()
def get_all_chats_with_last_message():
    user_info = get_jwt_identity()
    response_body = {}
    if user_info['user_is_student']:
        chats = db.session.execute(db.select(Chats).where(Chats.student_id == user_info['user_id'])).scalars()
    else:
        chats = db.session.execute(db.select(Chats).where(Chats.landlord_id == user_info['user_id'])).scalars()
    s_chats = []
    for chat in chats:
        last_message = Messages.query.filter_by(chat_id=chat.id).order_by(Messages.timestamp.desc()).first()
        print(last_message)
        chat_serialize = chat.serialize() 
        chat_serialize['last_message'] = last_message.message
        s_chats.append(chat_serialize)
    response_body['results'] = s_chats
    response_body['message'] = 'Chats with id' 
    return response_body, 200


@api.route('/chats' , methods=['POST'])
@jwt_required()
def create_chat():
    response_body = {}
    data = request.json
    row = Chats()
    row.student_id = data['student_id']
    row.landlord_id = data['landlord_id']
    row.room_id = data['room_id']
    db.session.add(row)
    db.session.commit()
    response_body['results'] = row.serialize()
    response_body['message'] = 'Chat created' 
    return response_body, 200

  
@api.route('/messages' , methods=['GET'])
def get_all_messages():
    response_body = {}
    message = db.session.execute(db.select(Messages)).scalars()
    results = [row.serialize() for row in message]
    response_body['results'] = results
    response_body['message'] = 'Message list'
    return response_body, 200


@api.route('/messages/<int:id>', methods=['GET'])
@jwt_required()
def handle_chats_messages(id):
    user_info = get_jwt_identity()
    response_body = {}
    results = []
    if user_info['user_is_student']:
        confirm_chat = db.session.execute(db.select(Chats).where(Chats.student_id == user_info['user_id'], Chats.id == id)).scalar_one_or_none()
    else:
        confirm_chat = db.session.execute(db.select(Chats).where(Chats.landlord_id == user_info['user_id'], Chats.id == id)).scalar_one_or_none()
    if confirm_chat:
        messages = db.session.execute(db.select(Messages).where(Messages.chat_id == id)).scalars()
        results = [row.serialize() for row in messages]
    response_body['results'] = results
    response_body['message'] = 'Messages in chat'
    return response_body, 200


@api.route('/messages', methods=['POST'])
@jwt_required()
def create_new_message():
    response_body = {}
    user_info = get_jwt_identity()
    user_id = user_info['user_id']
    data = request.json
    chat_id = data['chat_id']
    chat = db.session.execute(db.select(Chats).where(Chats.id == chat_id)).scalar()
    if not chat:
        response_body['message'] = "Chat not found"
        return response_body, 404    
    if chat.student_id != user_id and chat.landlord_id != user_id:
        response_body['message'] = "Chat 'User not authorized to post in this chat found"
        return response_body, 403 
    row = Messages()
    row.message = data['message']
    row.chat_id = chat_id
    row.sender_id = user_id
    row.is_read = False
    db.session.add(row)
    db.session.commit()
    response_body['results'] = row.serialize(),
    response_body['message'] = 'Message sent'
    return response_body, 200

