from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
# from datetime import date
from config import db, bcrypt
from datetime import date
import re

db = SQLAlchemy()
# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    points =  db.Column(db.Integer, default=0)

    # reviews =  db.relationship("Review", back_populates="user")
    
    # serialize_only = ("email", "username", "_password_hash")
    # serialize_rules = ("-rooms.users", "-bookings.user")

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates("email")
    def validate_email(self,key,email):
        pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if re.match(pattern, email) is not None:
            return email
        raise ValueError("Must be proper email format!")
        
        
    def __repr__(self):
        return f'<User {self.username}>'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    headline = db.Column(db.String)
    dep_date = db.Column(db.Date)
    arr_airport = db.Column(db.String)
    dep_airport = db.Column(db.String)
    seat_class = db.Column(db.String)
    airline = db.Column(db.String)
    ground_service = db.Column(db.String)
    air_service = db.Column(db.String)
    comfort = db.Column(db.String)
    food = db.Column(db.String)
    ife = db.Column(db.String)
    value = db.Column(db.String)
    further_comments = db.Column(db.String)
    # ticket_img = db.Column(db.String)
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
    # dep_airport_code = db.Column(db.String, db.ForeignKey("airports.code"))

    # user = db.relationship("User", back_populates="reviews")
    # airline = db.relationship("Airline", back_populates="reviews")
    # dep_airport = db.relationship("Airport", back_populates="reviews")
    
    # serialize_rules = ("-user.reviews", "-airline.reviews", "dep_airport.reviews")

    def __repr__(self):
        return f"<Review {self.id}>"

class Airline(db.Model, SerializerMixin):
    __tablename__ = 'airlines'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    logo = db.Column(db.String)

    # reviews =  db.relationship("Review", back_populates="airline")

    # serialize_rules = ("-reviews.airline")
    serialize_only = ("id", "title", "logo")
    def __repr__(self):
        return f"<Airline {self.id}>"
        

class Airport(db.Model, SerializerMixin):
    __tablename__ = 'airports'
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String, unique=True)
    name = db.Column(db.String)
    city = db.Column(db.String)
    country = db.Column(db.String)

    # reviews =  db.relationship("Review", back_populates="dep_airport")
    serialize_only = ("id", "code", "name","city","country")
    # serialize_rules = ("-reviews.dep_airport")
    
    def __repr__(self):
        return f"<Airport {self.id}>"