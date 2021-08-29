const bcrypt     = require('bcrypt');
const User       = require('../models/listUser');
const ListCourse = require('../models/listCourse');

module.exports = (req, res) => {
    const {username, password} = req.body;
    User.findOne({username : username}, (err, user) => {
        if (user)
        {
            console.log('have user');
            bcrypt.compare(password, user.password, (err, same) => {
                if (same)
                {
                    const listcourses = ListCourse.find({});

                    req.session.userId = user._id;
                    res.render(
                        'index',
                        {"user" : "user", "listcourses" : "listcourses"});
                }
                else
                    res.redirect('/');
            });
        };
    });
};
