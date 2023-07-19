#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
# import json
import requests
from app import app
from models import db, User, Review, Airline, Airport
from datetime import date
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting all records...")
        User.query.delete()
        Review.query.delete()

        print("Creating users...")
        users = []
        emails =[]

    
            
            # username = fake.first_name()
            # while username in usernames:
            #     username = fake.first_name()
            # usernames.append(username)

            # email = fake.email()
            # while email in emails:
            #     email = fake.email()
            # emails.append(email)

        user = User(
            first_name = "Josh",
            last_name = "Feldman",
            email = "joshfeldman500@gmail.com",
            _password_hash = "cookies"
        )

        user.password_hash = user.email + 'password'
        users.append(user)
        db.session.add_all(users)

        print("Creating reviews...")
        reviews = []
        review = Review(
            headline = "terrible",
            dep_date = date(2012,12,12),
            dep_airport = "JFK",
            arr_airport = "MIA",
            seat_class = "Business",
            ground_service = 1,
            air_service = 1,
            comfort = 1,
            food = 1,
            ife = 1,
            value = 1,
            further_comments = "hated it!!",
            airline = "American Airlines",
            user_id = 1,
        )
        

        db.session.add(review)
        
        # review.airline_id=Airline.query.filter_by(title=review.airline).first().id

        print("Creating airlines...")
        airlines = []
        json_url = 'http://localhost:4001/airlines' 
        response = requests.get(json_url)
        data = response.json()
        for item in data:
            record = Airline(title=item['name'], logo=item['logo'])
            airlines.append(record)
        db.session.add_all(airlines)

        print("Creating airports...")
        airports = []
        json_url = 'http://localhost:8001/airports' 
        response = requests.get(json_url)
        data = response.json()
        for item in data:
            record = Airport(
                code=item['iata_code'], 
                name=item['name'],
                city=item['city'],
                country=item['country']
            )
            airports.append(record)
        db.session.add_all(airports)



        db.session.commit()
        print("Complete.")