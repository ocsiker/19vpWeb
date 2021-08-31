module.exports = (req, res, next) => {
    if (req.body.password !== req.body.repassword)
        return res.redirect('/');
    next();
};
