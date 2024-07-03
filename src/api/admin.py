import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users , Universities , Students , Rooms , Favorites , Albums, Landlords, Flats, Chats, Messages


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(Universities, db.session))
    admin.add_view(ModelView(Students, db.session))
    admin.add_view(ModelView(Rooms, db.session))
    admin.add_view(ModelView(Favorites, db.session))
    admin.add_view(ModelView(Albums, db.session))
    admin.add_view(ModelView(Landlords, db.session))
    admin.add_view(ModelView(Flats, db.session))
    admin.add_view(ModelView(Chats, db.session))
    admin.add_view(ModelView(Messages, db.session))
