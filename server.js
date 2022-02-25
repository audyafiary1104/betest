
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const users = require("./router/api/User");
const auth = require("./router/api/Auth");
var mongodbCache = require('mongodb-redis-cache');

const db = require("./config/key").mongoURI;
const REDIS_URL = require("./config/key").REDIS_URL;
mongoose
    .connect(db)
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log(err));
    mongodbCache(mongoose, REDIS_URL);

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use(express.static('public'))
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running on port "+port));

