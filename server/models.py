from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


class FamilyMember(db.Model, SerializerMixin):
    __tablename__ = 'family_members'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)

    foods = db.relationship('Food', back_populates='family_member', cascade='all, delete-orphan')
    event = association_proxy('foods', 'event')

    serialize_rules = ('-foods.family_member',)

    def __repr__(self):
        return f'<Family Member {self.id}: {self.name}>'



class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    organizer_id = db.Column(db.Integer, db.ForeignKey('organizers.id'))

    foods = db.relationship('Food', back_populates='event', cascade='all, delete-orphan')
    organizer = db.relationship('Organizer', back_populates='events')
    
    family_member = association_proxy('foods', 'family_member')

    serialize_rules = ('-foods.event',)

    def __repr__(self):
        return f'<event {self.id}: {self.name}>'



class Food(db.Model, SerializerMixin):
    __tablename__ = 'foods'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    comments = db.Column(db.String)

    family_member_id = db.Column(db.Integer, db.ForeignKey('family_members.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    family_member = db.relationship('FamilyMember', back_populates='foods')
    event = db.relationship('Event', back_populates='foods')

    serialize_rules = ('-family_member.foods', '-event.foods')

    def __repr__(self):
        return f'<Food {self.id}: {self.name}>'


class Organizer(db.Model, SerializerMixin):
    __tablename__ = 'organizers'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    username = db.Column(db.String)

    events = db.relationship('Event', back_populates='organizer')

    def __repr__(self):
        return f'<Organizer {self.id}: {self.first_name} {self.last_name}>'