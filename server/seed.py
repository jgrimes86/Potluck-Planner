#!/usr/bin/env python3

# Local imports
from app import app
from models import db, FamilyMember, Event, Food, Organizer


with app.app_context():
    print("Starting seed...")
    # Seed code goes here!

    FamilyMember.query.delete()
    Event.query.delete()
    Food.query.delete()
    Organizer.query.delete()

    o1 = Organizer(first_name="John", last_name="Doe", email="email@email.com", username="jdoe", password_hash="123")
    o2 = Organizer(first_name="Eddie", last_name="Twoshoes", email="edd@email.com", username="eddie2", password_hash='abc')

    db.session.add_all([o1, o2])
    db.session.commit()


    e1 = Event(name='Thanksgiving Dinner', organizer_id=1)
    e2 = Event(name='Christmas Dinner', organizer_id=1)
    
    db.session.add_all([e1, e2])
    db.session.commit()


    fm1 = FamilyMember(first_name="Betsy", last_name="Ross", email="email@email.com")
    fm2 = FamilyMember(first_name="Aaron", last_name="Burr", email="email@email.com")
    fm3 = FamilyMember(first_name="Winston", last_name="Churchill", email="email@email.com")
    fm4 = FamilyMember(first_name="Abraham", last_name="Lincoln", email="email@email.com")
    fm5 = FamilyMember(first_name="Sally", last_name="Ride", email="email@email.com")

    db.session.add_all([fm1, fm2, fm3, fm4, fm5])
    db.session.commit()


    f1 = Food(family_member_id=1, event_id=1)
    f2 = Food(family_member_id=2, event_id=1)

    db.session.add_all([f1, f2])
    db.session.commit()
    