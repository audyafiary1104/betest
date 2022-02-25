var jwt = require("jsonwebtoken");
const secret = require("../config/key").secret;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.Login = (req, res) => {
    User.findOne({username: req.body.username}).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
          var token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 86400 // 24 hours
          });
      
          res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.emailAddress,
            accountNumber: user.accountNumber,
            identityNumber: user.identityNumber,
            accessToken: token
          });
    });
};
exports.Register = async (req, res) => {
    const newUser = new User({
        userName : req.body.userName,
        accountNumber : req.body.accountNumber,
        identityNumber : req.body.identityNumber,
        emailAddress : req.body.emailAddress,
        password :  await bcrypt.hash(req.body.password, 10),
    });

    newUser.save()
    .then(data => {
        res.send(data,);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Users."
        });
    });
};
