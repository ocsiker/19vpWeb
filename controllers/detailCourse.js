const ListCourse = require('../models/listCourse');

module.exports = async (req, res) => {
    const detailcourse = await ListCourse.findById(req.params.id);
    res.render('detail', {detailcourse})
}
