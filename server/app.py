#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import FamilyMember, Course, Food

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Login(Resource):
    
    def post(self):
        username = request.json['username']
        user = FamilyMember.query.filter_by(username = username).first()
        session['user_id'] = user.id
        return make_response(user.to_dict(), 200)

api.add_resource(Login, '/login')

class Signup(Resource):

    def post(self):
        data = request.json
        user = FamilyMember(name=data['firstName'], email=data['email'], username=data['username'])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200)

api.add_resource(Signup, '/signup')

class Logout(Resource):

    def get(self):
        session['user_id'] = {}
        return make_response('', 204)

api.add_resource(Logout, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

