const jwt = require("jsonwebtoken");
const secret = require('../config/key').secret
exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(403).send({ message: "No token provided!" });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };
  