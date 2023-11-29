from flask import make_response, request, session
from flask_restful import Resource
from config import app, db, api
from models import FamilyMember, Event, Food, Organizer

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Login(Resource):
    def post(self):
        username = request.json['username']
        user = Organizer.query.filter_by(username=username).first()
        session['user_id'] = user.id
        return make_response(user.to_dict(), 200)

api.add_resource(Login, '/login')

class Signup(Resource):
    def post(self):
        data = request.json
        user = Organizer(first_name=data['firstName'], last_name=data['lastName'], email=data['email'],
                          username=data['username'])
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
        user = Organizer.query.filter_by(id=session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

class FamilyMembers(Resource):

    def get(self):
        members = [fm.to_dict() for fm in FamilyMember.query.all()]
        return make_response(members, 200)

    def post(self):
        data = request.json
        new_member = FamilyMember(first_name=data['firstName'], last_name=data['lastName'], email=data['email'])
        db.session.add(new_member)
        db.session.commit()
        return make_response(new_member.to_dict(), 200)

api.add_resource(FamilyMembers, '/family_members')

class FamilyMembersById(Resource):

    def delete(self, id):
        fm = FamilyMember.query.filter_by(id = id).first()
        db.session.delete(fm)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(FamilyMembersById, '/family_members/<int:id>')

class FamilyMembersList(Resource):
    def get(self):
        try:
            family_members = FamilyMember.query.all()
            family_members_list = [{"id": member.id, "first_name": member.first_name, "last_name": member.last_name,
                                     "email": member.email} for member in family_members]
            return make_response(family_members_list, 200)
        except Exception as e:
            return {'error': str(e)}, 500

api.add_resource(FamilyMembersList, '/family_members')

class InvitedFamilyMembers(Resource):

    def get(self, event_id):
        family_members = db.session.query(FamilyMember).join(Food, FamilyMember.id == Food.family_member_id).filter(Food.event_id == event_id).all()
        fm_list = [fm.to_dict() for fm in family_members]
        return make_response(fm_list, 200)

api.add_resource(InvitedFamilyMembers, '/family_members/<int:event_id>')


class Foods(Resource):

    def get(self):
        event_id = request.args.get('event_id')
        foods = Food.query.filter_by(event_id=event_id).all()

        foods_list = [
            {"id": food.id, "name": food.name, "family_member_name": food.family_member.first_name + " " + food.family_member.last_name}
            for food in foods
        ]

        return make_response(foods_list, 200)

    def post(self):
        data = request.json

        food_name = data.get('foodName') or data.get('name')
        family_member_id = data.get('familyMemberId')
        event_id = data.get('eventId')

        if not food_name or not family_member_id or not event_id:
            return {'error': 'Incomplete data provided'}, 400

        new_food = Food(
            name=food_name,
            family_member_id=family_member_id,
            event_id=event_id
        )

        db.session.add(new_food)
        db.session.commit()

        response_dict = {
            "id": new_food.id,
            "name": new_food.name,
            "family_member_name": new_food.family_member.first_name + " " + new_food.family_member.last_name
        }

        return make_response(response_dict, 200)

api.add_resource(Foods, '/foods')

class FoodsById(Resource):
    
    def patch(self, id):
        food = Food.query.filter_by(id = id).first()
        data = request.json
        for attr in data:
            setattr(food, attr, data[attr])
        db.session.commit()
        response_dict = {
            "id": food.id,
            "name": food.name,
            "family_member_name": food.family_member.first_name + " " + food.family_member.last_name
        }
        return make_response(response_dict, 200)

    def delete(self, id):
        food = Food.query.filter_by(id = id).first()
        db.session.delete(food)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(FoodsById, '/foods/<int:id>')


class Events(Resource):
    def get(self):
        events = Event.query.all()
        events_list = [{"id": event.id, "name": event.name} for event in events]
        return make_response(events_list, 200)

    def post(self):
        data = request.json
        organizer_id = session.get('user_id')
        if organizer_id:
            new_event = Event(name=data['eventName'], organizer_id=organizer_id)
            db.session.add(new_event)
            db.session.commit()
            return make_response(new_event.to_dict(), 200)
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(Events, '/events')

class EventById(Resource):
    def delete(self, id):
        event = Event.query.filter_by(id=id).first()
        db.session.delete(event)
        db.session.commit()
        return make_response({},204)




api.add_resource(EventById, '/events/<id>')

@app.route('/events/<int:event_id>', methods=['GET', 'DELETE'])
def get_or_delete_event(event_id):
    if request.method == 'GET':
        event = Event.query.get(event_id)
        if event:
            return make_response(event.to_dict(), 200)
        else:
            return {'message': 'Event not found'}, 404
    elif request.method == 'DELETE':
        event = Event.query.get(event_id)
        if event:
            db.session.delete(event)
            db.session.commit()
            return make_response({'message': 'Event has been deleted'}, 200)
        else:
            return {'message': 'Event not found'}, 404

if __name__ == '__main__':
    app.run(port=5555, debug=True)
