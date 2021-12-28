var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
        bcrypt: true,
        required: true
    },
    email: {
        type: String
    },
    profileImage: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if(err) throw err;
        // Set hashed pw
        newUser.password = hash;
        // Create User
        newUser.save(callback);
    });
}

