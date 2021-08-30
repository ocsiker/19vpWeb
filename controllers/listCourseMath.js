
const ListCourse = require('../models/listCourse');

module.exports = async (req, res) => {
    await ListCourse.find(
        {course : {$in : [ /Toán/i, /math/i ]}}, (err, resultmaths) => {
            if (resultmaths.length > 0)
            {
                console.log(resultmaths);
                return res.render('listCourseMath', {resultmaths});
            }
            res.redirect('/content-1');
        });
};
