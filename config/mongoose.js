const mongoose = require('mongoose');

require('dotenv').config();

const db = mongoose.connect(process.env.DB_URI);

db.then( () => {
    console.log("successfully connected to mongoDB");
}).catch( (err) => {
    console.log("error while connecting mongoDB");
});

module.exports = db;