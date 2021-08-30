
const ListCourse = require('../models/listCourse');

module.exports = async (req, res) => {
    await ListCourse.find({course : {$in : [ /Văn/i, /literature/i ]}},
                          (err, resultliteratures) => {
                              if (resultliteratures.length > 0)
                              {
                                  console.log(resultliteratures);
                                  return res.render('listCourseLiterature',
                                                    {resultliteratures});
                              }
                              res.redirect('/content-1');
                          });
};
