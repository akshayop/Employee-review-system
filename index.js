const express = require('express'); // express.js 
const app = express();
const port = 8000;  //Port number where server localy hosts
const expressLayouts = require('express-ejs-layouts');


// before all the router this middleware should be called to use layout featues 
app.use(expressLayouts);


// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


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