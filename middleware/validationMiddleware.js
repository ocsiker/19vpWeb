module.exports = (req, res, next) => {
    if (req.files == null || req.body.name == null)
        return res.redirect('upListCourse');
    next();
};
