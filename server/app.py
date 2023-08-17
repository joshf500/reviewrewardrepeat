#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
# Local imports
from config import app, db, api
import ipdb
from datetime import date
from models import User, Review, Airline, Airport

# date()
#Global functions
def parse_date(datestring):
    return date(int(datestring[:4]),int(datestring[5:7]),int(datestring[8:]))

# Views go here!

class Signup(Resource):
    
    def post(self):
        

        user = User(
            first_name = request.json['first_name'],
            last_name = request.json['last_name'],
            email = request.json['email']
        )

        # the setter will encrypt this
        user.password_hash = request.json['password']

        # try:

        print('here!')

        db.session.add(user)
        db.session.commit()

        # session['user_id'] = user.id

        print(user.to_dict())

        return user.to_dict(), 201

        # except IntegrityError:

        #     print('no, here!')
            
        #     return {'error': 'unable to add user'}, 422

class Login(Resource):
    
    def post(self):

        request_json = request.get_json()
        
        email = request.json['email']
        password = request.json['password']

        user = User.query.filter(User.email == email).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                print (user.id)
                return user.to_dict(), 201

        return {'error': 'Incorrect email or password'}, 401

class CheckSession(Resource):
    
     def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
        

class Logout(Resource):
    
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401


class Reviews(Resource):
    
    def post(self):
        # try:
            review = Review(
                headline = request.json['headline'],
                dep_date = parse_date(request.json['dep_date']),
                dep_airport = request.json['dep_airport'],
                arr_airport = request.json['arr_airport'],
                seat_class = request.json['seat_class'],
                ground_service = request.json['ground_service'],
                air_service = request.json['air_service'],
                comfort = request.json['comfort'],
                food = request.json['food'],
                ife = request.json['ife'],
                value = request.json['value'],
                further_comments = request.json['further_comments'],
                airline = request.json['airline'],
                # ticket_img=request.json['ticket_img'],
            )
            review.user_id = session.get('user_id')

            db.session.add(review)
            # review.airline_id = Airline.query.filter_by(title=review.airline).first().id

            db.session.commit()
            
            return review.to_dict(), 201
        # except:
            return {'Error': "Invalid review"}, 40

class AddPointsToUser(Resource):
    def patch(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if user is None:
            return {'message': 'User not found'}, 404
        user.points += 200
        db.session.commit()

        return {'message': 'Points added successfully', 'current total points': user.points}, 200

class ReviewsByDep(Resource):
    def get(self,airport):
        reviews = Review.query.filter_by(dep_airport=airport).all()
        reviews = [r.to_dict() for r in reviews]
        return reviews, 200

class ReviewsByUser(Resource):
    def get(self,id):
        reviews = Review.query.filter_by(user_id=id).all()
        reviews = [r.to_dict() for r in reviews]
        return reviews, 200

class Airlines(Resource):
    def get(self):
        airlines = Airline.query.all()
        airlines = [a.to_dict() for a in airlines]
        return airlines, 200

class Airports(Resource):
     def get(self):
        airports = Airport.query.all()
        airports = [a.to_dict() for a in airports]
        return airports, 200


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Reviews, '/reviews', endpoint='reviews')
api.add_resource(ReviewsByDep, '/reviews/<string:airport>', endpoint='reviews/<string:airport>')
api.add_resource(ReviewsByUser, '/reviews/<int:id>', endpoint='reviews/<int:id>')
api.add_resource(Airlines, '/airlines', endpoint='airlines')
api.add_resource(Airports, '/airports', endpoint='airports')
api.add_resource(AddPointsToUser, '/addpointstouser/<int:user_id>', endpoint='/addpointstouser/<int:user_id>')


# if __name__ == '__main__':
#    app.run(port=5556, debug=True, host="10.129.2.122")