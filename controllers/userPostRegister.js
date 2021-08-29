const ListUser = require('../models/listUser');

module.exports = async (req, res) => {
    if (req.body.password !== req.body.repassword)
        // res.send(<script>alert("your alert message"); window.location.href =
        // "/"; </script>);
        res.redirect('/').res.json({'err' : 'sai mat khau'});
    else
    {
        await ListUser.create(req.body, (err, user) => {
            if (user)
                res.redirect('/');
            else
                res.send(err);
        });
    }
};
