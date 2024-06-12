from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'is_admin': self.is_admin}


class Universities(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    longitude = db.Column(db.Float, unique=False, nullable=False)
    latitude = db.Column(db.Float, unique=False, nullable=False)

    def __repr__(self):
            return f'<User {self.id}>'
    def serialize(self):
            return {'id': self.id,
                    'name': self.name,
                    'latitude': self.latitude,
                    'longitude': self.longitude}


class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_university = db.Column(db.Integer, db.ForeignKey('universities.id'))
    id_university_to = db.relationship('Universities', foreign_keys=[id_university])
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'))
    id_user_to = db.relationship('Users', foreign_keys=[id_user])
    name = db.Column(db.String(60), unique=False, nullable=False)
    surname = db.Column(db.String(120), unique=False, nullable=False)
    birth_date = db.Column(db.Date, unique=False, nullable=True)
    dni = db.Column(db.String(9), unique=True, nullable=False)
    phone_number = db.Column(db.String(13), unique=True, nullable=True) # Formato 034-XXXXXXXXX 13 caracteres
    profile_picture = db.Column(db.String(), unique=True, nullable=True)

    def __repr__(self):
            return f'<Student {self.id}>'
    def serialize(self):
            return {'id': self.id,
                    'id_university': self.id_university,
                    'id_user': self.id_user,
                    'name': self.name,
                    'surname': self.surname,
                    'birth_date': self.birth_date,
                    'dni': self.dni,
                    'phone_number': self.phone_number,
                    'profile_picture': self.profile_picture}


class Rooms(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String() , nullable = False)
    square_meters = db.Column(db.Float() , unique = True , nullable = False)
    price = db.Column(db.Float() , unique = True , nullable = False)
    id_flat = db.Column(db.Integer() , db.ForeignKey('flats.id'))
    to_id_flat = db.relationship('Flats' , foreign_keys=[id_flat])
    id_assigned_student = db.Column(db.Integer() , db.ForeignKey('students.id'))
    to_id_assigned_student = db.relationship('Students' , foreign_keys=[id_assigned_student])
    image_url_1 = db.Column(db.String() , nullable = False)
    image_url_2 = db.Column(db.String() , nullable = False)

    def __repr__(self):
        return f'<Rooms {self.title}>'

    def serialize(self):
        return {"id": self.id,
            "title": self.title,
            "square_meters": self.square_meters,
            "price" : self.price,
            "id_flat" : self.id_flat,
            "id_assigned_student" : self.id_assigned_student, 
            "publication_date" : self.publication_date,
            "image_url_1" : self.image_url,
            "image_url_2" : self.image_url}


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
    id_flat = db.Column(db.Integer() , db.ForeignKey('flats.id'))
    to_id_student = db.relationship('Flats' , foreign_keys=[id_flat])
    url_photo = db.Column(db.String() , nullable = False , unique = True)

    def __repr__(self):
        return f'<Albums {self.id}>'

    def serialize(self):
        return {"id": self.id,
            "id_flat": self.id_flat,
            "url_photo": self.url_photo}
      
      
class Landlords(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'))
    id_user_to = db.relationship('Users', foreign_keys=[id_user])
    name = db.Column(db.String(), nullable=False)
    surname = db.Column(db.String(), nullable=False)
    birth_date = db.Column(db.Date, nullable=True)
    dni = db.Column(db.String(), unique=True, nullable=False)
    phone_number = db.Column(db.String(), unique=True)
    profile_picture = db.Column(db.String())
    
    def __repr__(self):
        return f'<Landlord {self.dni}>'

    def serialize(self):
        return {'id': self.id,
                'id_user': self.id_user,
                'name': self.name,
                'surname': self.surname,
                'birth_date': self.birth_date,
                'dni': self.dni,
                'phone_number': self.phone_number,
                'profile_picture': self.profile_picture}


class Flats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_landlord = db.Column(db.Integer, db.ForeignKey('landlords.id'))
    id_landlord_to = db.relationship('Landlords', foreign_keys=[id_landlord])
    address = db.Column(db.String(), nullable=False)
    description = db.Column(db.String())
    longitude = db.Column(db.Float(), nullable=False)
    latitude = db.Column(db.Float(), nullable=False)

    def __repr__(self):
        return f'<Flat {self.address}>'

    def serialize(self):
        return {'id': self.id,
                'id_landlord': self.id_landlord,
                'address': self.address,
                'description': self.description,
                'longitude': self.longitude,
                'latitude': self.latitude}
