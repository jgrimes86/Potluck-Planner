from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# POSSIBLE WAY TO CREATE MULTIPLE EVENT TABLES:
# def create_event(family_tablename, family_course_tablename, family_food_tablename):


class FamilyMember(db.Model, SerializerMixin):
    __tablename__ = 'family_members'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    # QUESTION: Do we need a name and username? Or just a username?
    username = db.Column(db.String)
    # POSSIBLE WAY TO SEPARATE USERS BY FAMILY:
    # family_name = db.Column(db.String)

    foods = db.relationship('Food', back_populates='family_member', cascade='all, delete-orphan')
    course = association_proxy('foods', 'course')

    serialize_rules = ('-foods.family_member',)

    def __repr__(self):
        return f'<Family Member {self.id}: {self.name}>'



class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    
    foods = db.relationship('Food', back_populates='course', cascade='all, delete-orphan')
    family_member = association_proxy('foods', 'family_member')

    serialize_rules = ('-foods.course',)

    def __repr__(self):
        return f'<Course {self.id}: {self.name}>'



class Food(db.Model, SerializerMixin):
    __tablename__ = 'foods'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    comments = db.Column(db.String)

    family_member_id = db.Column(db.Integer, db.ForeignKey('family_members.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))

    family_member = db.relationship('FamilyMember', back_populates='foods')
    course = db.relationship('Course', back_populates='foods')

    serialize_rules = ('-family_member.foods', '-course.foods')

    def __repr__(self):
        return f'<Food {self.id}: {self.name}>'

