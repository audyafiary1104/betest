require('dotenv').config()

module.exports = {
    mongoURI:process.env.mongoURI ,
    secret: process.env.secret,
    REDIS:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    }
};