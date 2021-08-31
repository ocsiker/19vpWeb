const ListUser = require('../models/listUser');

module.exports = async (req, res) => {
    if (req.body.password !== req.body.repassword)
        // res.send(<script>alert("your alert message"); window.location.href =
        // "/"; </script>);
        return res.redirect('/');
    else
    {
        await ListUser.create(req.body, (err, user) => {
            if (user)
                res.redirect('/');
            else
            {
                const validationErrors =
                    Object.keys(err.errors).map(key => err.errors[key].message);
                req.flash('validationErrors', validationErrors);
                req.flash('data', req.body);
                return res.redirect('/');
            };
        });
    }
};
