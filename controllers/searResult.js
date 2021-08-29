const ListCourse = require('../models/listCourse');

module.exports = async (req, res) => {
    //    ListCourse.find({name : req.body.search}, (err, searchWords) => {
    //        console.log(err);
    //       console.log(searchWords);
    //     });
    await ListCourse.find({name : {$regex : '.*' + req.body.search + '.*'}},
                          (err, searchWords) => {
                              console.log(searchWords);
                              if (searchWords.length > 0)
                                  res.render('result', {searchWords});
                              else
                                  res.send('cannot find ');
                          });
    // res.redirect('/search');
};
