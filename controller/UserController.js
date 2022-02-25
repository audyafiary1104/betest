const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getUserSingle = (req, res) => {
    switch (req.body.filterBy) {
        case 'identityNumber':
            User.findOne({identityNumber :req.body.filter}).cache({ expire: 10 }).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }
                res.status(200).send(user);
            });
            break;
        case 'accountNumber':
            User.findOne({accountNumber :req.body.filter}).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }
                res.status(200).send(user);
            });
             break;
            
        default:
            res.status(500).send({ message: 'filterby harus diisi dengan (accountNumber / identityNumber)' });
            break;
    }
};

exports.AllUser = (req, res) => {
    User.find().cache({ expire: 10 }).then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
exports.CreateUser = (req, res) => {
    const newUser = new User({
        userName : req.body.userName,
        accountNumber : req.body.accountNumber,
        identityNumber : req.body.identityNumber,
        emailAddress : req.body.emailAddress,
        password : bcrypt.hashSync(req.body.password, 8),
    });
    newUser.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Users."
        });
    });
};
exports.Update = (req, res) => {
    if(!req.body.data) {
        return res.status(400).send({
            message: "Users content can not be empty"
        });
    }
    User.findByIdAndUpdate(req.params.userid, {
        userName: req.body.data.userName,
        accountNumber: req.body.data.accountNumber ,
        identityNumber: req.body.data.identityNumber,
        emailAddress: req.body.data.emailAddress,
    })
    .then(users => {
        if(!users) {
            return res.status(404).send({
                message: "Users not found with id " + req.params.userid
            });
        }
        res.send({
            message: "success Update Users"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Users not found with id " + req.params.userid
            });                
        }
        return res.status(500).send({
            message: "Error updating Users with id " + req.params.userid
        });
    });
};
exports.Delete = (req, res) => {
    User.findByIdAndRemove(req.params.userid)
    .then(users => {
        if(!users) {
            return res.status(404).send({
                message: "users not found with id " + req.params.userid
            });
        }
        res.send({message: "users deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "users not found with id " + req.params.userid
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.userid
        });
    });
};