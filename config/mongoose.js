const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://127.0.0.1:27017/ERS');

db.then( () => {
    console.log("successfully connected to mongoDB");
}).catch( (err) => {
    console.log("error while connecting mongoDB");
});

module.exports = db;