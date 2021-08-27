const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcrypt');

const UserSchema = new Schema({
    username : {type : String, required : true, unique : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
});

UserSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

const ListUser = mongoose.model('ListUser', UserSchema);

module.exports = ListUser;
