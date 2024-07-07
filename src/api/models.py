from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    is_student = db.Column(db.Boolean(), unique=False, nullable=False)
    is_landlord = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'is_admin': self.is_admin,
                'is_student': self.is_student,
                'is_landlord': self.is_landlord}


class Universities(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    longitude = db.Column(db.Float, unique=False, nullable=False)
    latitude = db.Column(db.Float, unique=False, nullable=False)

    def __repr__(self):
            return f'<User {self.name}>'
    def serialize(self):
            return {'id': self.id,
                    'name': self.name,
                    'latitude': self.latitude,
                    'longitude': self.longitude}
    
    def public_serialize(self):
        return {'university_name': self.name,
                'latitude': self.latitude,
                'longitude': self.longitude}


class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_university = db.Column(db.Integer, db.ForeignKey('universities.id'))
    id_university_to = db.relationship('Universities', foreign_keys=[id_university])
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    id_user_to = db.relationship('Users', foreign_keys=[id_user])
    name = db.Column(db.String(60), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    birth_date = db.Column(db.Date, unique=False, nullable=True)
    dni = db.Column(db.String(9), unique=False, nullable=False)
    phone_number = db.Column(db.String(13), unique=True, nullable=True) # Formato 034-XXXXXXXXX 13 caracteres
    profile_picture = db.Column(db.String(), unique=True, nullable=True)

    def __repr__(self):
            return f'<Student {self.dni , self.name}>'
    def serialize(self):
            return {'id': self.id,
                    'id_university': self.id_university,
                    'id_user': self.id_user,
                    'name': self.name,
                    'lastname': self.lastname,
                    'birth_date': self.birth_date,
                    'dni': self.dni,
                    'phone_number': self.phone_number,
                    'profile_picture': self.profile_picture}
    def public_serialize(self):
        return {'student_name': self.name,
                'student_lastname': self.lastname,
                'birth_date': self.birth_date,
                'dni': self.dni,
                'phone_number': self.phone_number,
                'profile_picture': self.profile_picture}


class Rooms(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String() , nullable = False)
    description = db.Column(db.String() , nullable=False, unique=False)
    price = db.Column(db.Float() , nullable = False)
    id_flat = db.Column(db.Integer() , db.ForeignKey('flats.id'))
    to_id_flat = db.relationship('Flats' , foreign_keys=[id_flat])
    id_assigned_student = db.Column(db.Integer() , db.ForeignKey('students.id'))
    to_id_assigned_student = db.relationship('Students' , foreign_keys=[id_assigned_student])
    image_url_1 = db.Column(db.String() , nullable = False)
    image_url_2 = db.Column(db.String() , nullable = False)
    flat_img = db.Column(db.Integer() , db.ForeignKey('albums.id'))
    to_flat_img = db.relationship('Albums' , foreign_keys=[flat_img]) 
    publication_date = db.Column(db.Date() , unique = False)

    def __repr__(self):
        return f'<Rooms {self.title}>'

    def serialize(self):
        return {"id": self.id,
            "title": self.title,
            "description": self.description,
            "price" : self.price,
            "id_flat" : self.id_flat,
            "id_assigned_student" : self.id_assigned_student, 
            "publication_date" : self.publication_date,
            "image_url_1" : self.image_url_1,
            "image_url_2" : self.image_url_2,
            "flat_img": self.flat_img}


class Favorites(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    id_student = db.Column(db.Integer() , db.ForeignKey('students.id'))
    to_id_student = db.relationship('Students' , foreign_keys=[id_student])
    id_room = db.Column(db.Integer() , db.ForeignKey('rooms.id'))
    to_id_room = db.relationship('Rooms' , foreign_keys=[id_room])

    def __repr__(self):
        return f'<Favorites {self.id}>'

    def serialize(self):
        return {"id": self.id,
            "id_student": self.id_student,
            "id_room": self.id_room}


class Albums(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    url_album_cloudinary = db.Column(db.String() , nullable = False , unique = True)


    def __repr__(self):
        return f'<Albums {self.id }>'

    def serialize(self):
        return {"id": self.id,
                "url_album_cloudinary": self.url_album_cloudinary}
      

class Landlords(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    id_user_to = db.relationship('Users', foreign_keys=[id_user])
    name = db.Column(db.String(), nullable=True)
    lastname = db.Column(db.String(), nullable=True)
    birth_date = db.Column(db.Date, nullable=True)
    dni = db.Column(db.String(), unique=True)
    phone_number = db.Column(db.String(), unique=True)
    profile_picture = db.Column(db.String())
    
    def __repr__(self):
        return f'<Landlord {self.dni , self.name}>'

    def serialize(self):
        return {'id': self.id,
                'id_user': self.id_user,
                'name': self.name,
                'lastname': self.lastname,
                'birth_date': self.birth_date,
                'dni': self.dni,
                'phone_number': self.phone_number,
                'profile_picture': self.profile_picture}
    
    def public_serialize(self):
        return {'landlord_name': self.name,
                'landlord_lastname': self.lastname,
                'birth_date': self.birth_date,
                'dni': self.dni,
                'phone_number': self.phone_number,
                'profile_picture': self.profile_picture}


class Flats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_landlord = db.Column(db.Integer, db.ForeignKey('landlords.id'))
    id_landlord_to = db.relationship('Landlords', foreign_keys=[id_landlord])
    address = db.Column(db.String(), nullable=False)
    postal_code = db.Column(db.String(), nullable=False)
    city = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    square_meters = db.Column(db.Float() )
    id_album = db.Column(db.Integer(), db.ForeignKey('albums.id'), unique=True)
    to_album_id = db.relationship('Albums' , foreign_keys=[id_album])
    

    def __repr__(self):
        return f'<Flat {self.address}>'

    def serialize(self):
        return {'id': self.id,
                'id_landlord': self.id_landlord,
                'address': self.address,
                'description': self.description,
                'postal_code': self.postal_code,
                'city': self.city,
                 "square_meters": self.square_meters,
                'id_album': self.id_album}


class Chats(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    student_id = db.Column(db.Integer(), db.ForeignKey('students.id_user'))
    to_student_id = db.relationship('Students' , foreign_keys=[student_id])
    landlord_id = db.Column(db.Integer(), db.ForeignKey('landlords.id_user'))
    to_landlord_id = db.relationship('Landlords' , foreign_keys=[landlord_id])
    room_id = db.Column(db.Integer(), db.ForeignKey('rooms.id'))
    to_room_id = db.relationship('Rooms' , foreign_keys=[room_id])
   

    def __repr__(self):
        return f'<Chats {self.student_id , self.landlord_id}>'

    def get_all_messages(self):
        messages = Messages.query.filter_by(chat_id=self.id).order_by(Messages.timestamp).all()
        return [{'message': messages.message,
                 'sender_name': messages.get_sender_name(),
                 'sender_lastname': messages.get_sender_lastname(),
                 'timestamp': messages.timestamp,
                 'is_read': messages.is_read} for message in messages]

    def get_all_chats_with_last_message(user_id):
        chats = Chats.query.all()
        chat_list = []
        for chat in chats:
            last_message = Messages.query.filter_by(chat_id=chat.id).order_by(Messages.timestamp.desc()).first()
            chat_list.append({
                'chat_id': chat.id,
                'student_name': chat.to_student_id.name,
                'landlord_name': chat.to_landlord_id.name,
                'last_message': last_message.message if last_message else None,
                'last_message_timestamp': last_message.timestamp if last_message else None})
        return chat_list

    def serialize(self):
        return {'id': self.id,
                'student_id': self.student_id,
                'landlord_id': self.landlord_id,
                'room_id': self.room_id,
                'student_name': self.to_student_id.name,
                'landlord_name': self.to_landlord_id.name}


class Messages(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    message = db.Column(db.String(), nullable=False)
    chat_id = db.Column(db.Integer(), db.ForeignKey('chats.id'))
    to_chat_id = db.relationship('Chats' , foreign_keys=[chat_id])
    timestamp = db.Column(db.DateTime() , default=datetime.utcnow)
    sender_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    to_sender_id = db.relationship('Users' , foreign_keys=[sender_id])
    is_read = db.Column(db.Boolean())


    def __repr__(self):
        return f'<Messages {self.sender_id , self.timestamp}>'

    def get_sender_name(self):
        sender = None
        if self.to_chat_id.to_student_id.id_user == self.sender_id:
            sender = self.to_chat_id.to_student_id
        elif self.to_chat_id.to_landlord_id.id_user == self.sender_id:
            sender = self.to_chat_id.to_landlord_id
        return sender.name if sender else "Unknown"
    
    def get_sender_lastname(self):
        sender = None
        if self.to_chat_id.to_student_id.id_user == self.sender_id:
            sender = self.to_chat_id.to_student_id
        elif self.to_chat_id.to_landlord_id.id_user == self.sender_id:
            sender = self.to_chat_id.to_landlord_id
        return sender.lastname if sender else "Unknown"

    def serialize(self):
        return {'id': self.id,
                'message': self.message,
                'chat_id': self.chat_id,
                'timestamp': self.timestamp,
                'sender_name': self.get_sender_name(),
                'sender_lastname': self.get_sender_lastname(),
                'is_read': self.is_read}
