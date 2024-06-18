"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users , Rooms , Albums , Favorites

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
    row.id_flat = data['id_flat']
    row.url_photo = data['url_photo']
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