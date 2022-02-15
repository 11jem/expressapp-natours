# Natours

Natours is both an API and a website created using node.js, express, mongodb, and mongoose.

---

## API

The Natours API is a REST API that can handle the HTTP verbs GET, POST, PATCH DELETE, and OPTIONS. Access the tours, users, reviews, and bookings collection of the fictional tour company Natours.

**Features**

- Error handling
- Security
- Authentication and Authorization
- Stripe integration
- Postman docs

Read the documentation [here](https://documenter.getpostman.com/view/18724671/UVeJM5ya).

## Website

The Natours website uses the Natours API and is rendered server-side using pug templates.

**Features**

- Logging in
- Updating user information
- Photo upload
- Booking tours using Stripe

![Natours website](dev-data/img/natours-website.PNG)

Visit the website [here](https://project-natours-11jem.herokuapp.com/).

## Deployment

Both the API and the website are deployed on Heroku. The configuration variables are set in Heroku as well.

## File structure

1. `./controllers` - route and error handlers
1. `./dev-data` - data imported to the database
1. `./models` - mongoose schemas and middlewares
1. `./public` - code related to the frontend
1. `./routes` - routing of endpoints
1. `./utils` - helper functions
1. `./views` - pug templates
1. `./app.js` - code related to express
1. `./server.js` - starting of server

## Acknowledgements

This project is part of Jonas Schmedtmann's Node.js and Express course.
