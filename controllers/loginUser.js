const bcrypt = require('bcrypt');
const User   = require('../models/listUser');

module.exports = (req, res) => {
    const {username, password} = req.body;
    User.findOne({username : username}, (err, user) => {
        if (user)
        {
            console.log('have user');
            bcrypt.compare(password, user.password, (err, same) => {
                if (same)
                {
                    req.session.userId = user._id;
                    res.redirect('/');
                }
                else
                    res.redirect('/');
            });
        };
    });
};
