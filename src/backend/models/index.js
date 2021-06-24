require('dotenv').config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const url =  `mongodb+srv://msse663:${process.env.MONGO_PASSWORD}@cluster0.73dsl.mongodb.net/Cluster0?retryWrites=true&w=majority`
const db = {};
db.mongoose = mongoose;
db.url = url;
db.programs = require("./program.model.js")(mongoose);

module.exports = db;
