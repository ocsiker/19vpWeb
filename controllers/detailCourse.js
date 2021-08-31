const ListCourse = require('../models/listCourse');
const ListUser   = require('../models/listUser');

module.exports = async (req, res) => {
    const detailcourse = await ListCourse.findById(req.params.id);
    let tempuser       = await ListUser.findById(req.session.userId);
    res.render('detail', {detailcourse : detailcourse, tempuser : tempuser})
    // res.send({detailcourse : detailcourse, tempuser : tempuser})
}
