from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'is_admin': self.is_admin}

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
