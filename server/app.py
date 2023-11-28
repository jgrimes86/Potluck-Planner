#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import FamilyMember, Event, Food, Organizer

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# LOGIN PAGE

class Login(Resource):
    
    def post(self):
        username = request.json['username']
        user = Organizer.query.filter_by(username = username).first()
        session['user_id'] = user.id
        return make_response(user.to_dict(), 200)

api.add_resource(Login, '/login')

class Signup(Resource):

    def post(self):
        data = request.json
        user = Organizer(first_name=data['firstName'], last_name=data['lastName'], email=data['email'], username=data['username'])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200)

api.add_resource(Signup, '/signup')

class Logout(Resource):

    def get(self):
        session['user_id'] = {}
        return make_response('', 204)

api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    
    def get(self):
        user = Organizer.query.filter_by(id = session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

# ADD FAMILY PAGE

class FamilyMembers(Resource):

    def post(self):
        data = request.json
        new_member = FamilyMember(first_name=data['firstName'], last_name=data['lastName'], email=data['email'])
        db.session.add(new_member)
        db.session.commit()
        return make_response(new_member.to_dict(), 200)

api.add_resource(FamilyMembers, '/family_members')

class Foods(Resource):

    def post(self):
        data = request.json
        new_food = Food(family_member_id=data['family_member_id'], event_id=data['event_id'])
        db.session.add(new_food)
        db.session.commit()
        return make_response(new_food.to_dict(), 200)

api.add_resource(Foods, '/foods')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

