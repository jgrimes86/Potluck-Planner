# Potluck Planner

Potluck Planner is a phase 4 project for Flatiron School's software engineering course.  It is a full-stack application that makes use of a Flask API backend with a React frontend.

Potluck Planner helps users keep track of family members invited to large family gatherings and the foods that different family members will bring to the event.  A user can sign up to make an account and then log in to their account.  The event page displays a list of all events that have been created and allows users to create new evenst.  After selecting an event, the user can navigate to the Family Members page where they can add family members to the database, keep track of who has been invited, mark family members as being univited, and delete family members from the database.  On the Event page, the user can see a list of the family members who have been invited to that particular event.  They can also add, change, or delete list items to keep track of the food each family member will be bringing with them.

## Instructions

If you would like to use this application, fork and clone the repository to your computer. Once you’ve opened the code, run the following commands in your terminal to get everything up and running!

### Install and Start the Backend

1. In your terminal, install Python environment:
```
pipenv install
```

2. Enter the Python virtual environment and navigate to the server director:
```
pipenv shell
cd server
```

3. Create the database:
```
flask db init
flask db migrate
flask db upgrade head
```

4. There is a file with some starting data that you can use:
```
python seed.py
```

5. Start the backend server:
```
python app.py
```

### Install and Start the Frontend

1. In a second terminal, navigate into the client directory and install React components:
```
cd client
npm install
```

2. Start the frontend:
```
npm start
```

## Authors

This application was created by [Ed Berisha](https://github.com/ehadberisha), [Angelus Bootle](https://github.com/Avgelus), and [Jim Grimes](http://github.com/jgrimes86).
