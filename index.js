const express = require('express'); // express.js 
const app = express(); //creating express app instance
const port = 8000;  //Port number where server localy hosts
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookies 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');


const mongoStore = require('connect-mongo');
const MongoStore = require('connect-mongo');

// to parse the body request
app.use(express.urlencoded());

// before all the router this middleware should be called to use layout featues 
app.use(expressLayouts);


// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');



// mongo store is used to store the session cookies in the db
app.use(session({
    name: 'ers',
    secret: 'skillTest2',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/ERS',
        autoRemove: 'disabled'
    })

}));

// passport use
app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response 
app.use(passport.setAuthenticatedUser);




// user express router
app.use('/', require('./routes'));

// Hosting the server and handling the error in case of any problem occurs while hosting
app.listen(port, (err) => {
    if(err) {
        console.log('Error while hosting the server', err);
        return;
    }

    console.log(`Server is successfully up and running on port:${port}`);
})