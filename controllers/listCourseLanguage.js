
const ListCourse = require('../models/listCourse');

module.exports = async (req, res) => {
    await ListCourse.find(
        {course : {$in : [ /Anh/i, /english/i ]}}, (err, resultlanguages) => {
            if (resultlanguages.length > 0)
            {
                console.log(resultlanguages);
                return res.render('listCourseLanguage', {resultlanguages});
            }
            res.redirect('/content-1');
        });
};
