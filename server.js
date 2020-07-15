// Importing express inside your server
const express = require('express');

// Import mongoose inside server
const mongoose = require('mongoose');

// Import body-parser
const bodyParser = require('body-parser');

// Import passport package
const passport = require('passport');

    // Import the strategies & a way to extract the jsonwebtoken
    const JwtStrategy = require('passport-jwt').Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    
    // The same secret in routes/UserRoutes will be needed to read the jsonwebtoken
    const secret = "Srts3%$#Qtq";

// Import cors (for the backend to be able to read an external source, e.g. frontend)
const cors = require('cors');

// To find the user in the DB
const UsersModel = require('./models/UsersModel');

// Options for passport-jwt // Extract the user's id from the String
const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

// Options for passport-jwt 
const passportJwt = (passport) => {
passport.use(
    new JwtStrategy(
        passportJwtOptions,
        (jwtPayload, done) => {
            // Extract and find the user by their id (which is contained in jwt)
            UsersModel.findOne({_id: jwtPayload.id})
            .then(
                // If the doucment was found
                (document) => {
                    return done(null, doucment);
                }
            )
            .catch(
                // If something went wrong with DB search
                (err) => {
                    return done(null, null);
                }
            )
        }

    )
)
};

// Import routes
const ProductsRoutes = require('./routes/ProductsRoutes');
const FeedsRoutes = require('./routes/FeedsRoutes');
const UsersRoutes = require('./routes/UsersRoutes');
const EmailsRoutes = require('./routes/EmailsRoutes');

// Create the server object 
const server = express();

// Configure express to use body-parser
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(cors());

// Invoke passportJwt and pass the passport npm package as argument
passportJwt(passport);

// Enter your database coonection URL
const dbURL = "mongodb+srv://Admin01:katatonia94@cluster0-lug9b.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(
    dbURL, 
    {
        'useNewUrlParser': true,
        'useUnifiedTopology': true
    
    }
) .then (
    () => {
        console.log('You are connected to MongoDB');
    }
).catch(
    (e) => {
        console.log ('catch', e);
    }
);

// Links server.js to ProductsRoutes.js and FeedsRoutes.js
server.use(
    '/products', 
    //passport.authenticate('jwt', {session:false}), // Use passport-jwt to authenticate
    ProductsRoutes
);

server.use(
    '/feeds',
    passport.authenticate('jwt', {session:false}), 
    FeedsRoutes
);

server.use(
    '/feeds/like',
    FeedsRoutes
);

server.use(
    '/users', 
    UsersRoutes
);

server.use(
    '/emails', 
    EmailsRoutes
);

// Create a route for the landing page
server.get(
    '/',
    (req, res) => {
        res.send("<h1>Welcome to MyCars.com</h1>" +
        "<a href='/about'>About Us</a>");
    }
);

// Create a route for the about page
server.get(
    '/about',
    (req, res) => {
        res.send("<h1>About Us</h1>" +
        "<a href='/contact'>Contact Us</a>");
    }
);

// Create a route for the contact page
server.get(
    '/contact',
    (req, res) => {
        res.send("<h1>Contact Us</h1>" +
        "<a href='/products'>Our Products</a>");
    }
);

// Create a route for the products page
server.get(
    '/products',
    (req, res) => {
        res.send("<h1>Our Products</h1>") 
    }
);

// A GET route for fetching data from the 'products' collection
server.get(
    '/products',
    (req, res)=>{
        // (1) Fetch all the documents using .find()
        ProductsModel
        .find()
        // (2) Once the results are ready, use .json() to send the results
        .then(
            (results) => {
                // res.json = res.send () + converts to JSON
                res.json(results)
            }
        )
        .catch(
            (e)=> {
                console.log('error occured', e)
            }
        );
    }
);

// Create a route for the Error 404 page
server.get(
    '*',
    (req, res) => {
        res.send("<h1>Error: 404! Page not found!</h1>");
    }
);

// Connect to port (range 3000 - 9999)
// http://127.0.0.1:8080 (aka http://localhost:8081)
server.listen( 8081, ()=>{
    console.log('You are connected!');
    }
 )
 