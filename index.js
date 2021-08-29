const express        = require('express');
const path           = require('path');
const mongoose       = require('mongoose');
const ejs            = require('ejs');
const bodyParser     = require('body-parser');
const ListCourse     = require('./models/listCourse');
const fileUpload     = require('express-fileupload');
const ListUser       = require('./models/listUser');
const expressSession = require('express-session');

const validateMiddleware = require('./middleware/validationMiddleware');
const redirectIfAuthenticateMiddleware =
    require('./middleware/redirectIfAuthenticatedMiddleware');

// for login

const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/Courses', {useNewUrlParser : true});

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());
app.use(expressSession({secret : 'keyboard cat'}));

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});
app.get('/', async (req, res) => {
    //    res.sendFile(path.resolve('JSAV.pdf'));
    const listcourses = await ListCourse.find({});
    res.render('index', {listcourses});
});

app.get('/content', (req, res) => {
    res.render('content');
});
app.get('/list-course', async (req, res) => {
    const listcourses = await ListCourse.find({});
    res.render('listCourse', {listcourses});
})
/*
app.get('/list-course', async (req, res) => {
    const listcourses = await ListCourse.find({});
    res.render('listCourse', {listcourses});
})
*/
const detailCourseController = require('./controllers/detailCourse');
app.get('/detail/:id', detailCourseController);
// app.get('/detail/:id', async (req, res) => {
//    const detailcourse = await ListCourse.findById(req.params.id);
//    res.render('detail', {detailcourse});
//});

// creating form post course
// app.get('/up-list-course', (req, res) => {
//    res.render('upListCourse');
//}
const upListCourseController = require('./controllers/upListCourse');
app.get('/up-list-course', upListCourseController);

// creating form post course
// app.post('/posts/course/store', async (req, res) => {
//    let image = req.files.image;
//    let pdf   = req.files.pdf;
//    image.mv(path.resolve(__dirname, 'public/image', image.name));
//    pdf.mv(path.resolve(__dirname, 'public/pdf', pdf.name));
//    await ListCourse.create({
//        ...req.body,
//        image : '/image/' + image.name,
//        pdf : '/pdf/' + pdf.name
//    });
//    res.redirect('/up-list-course');
//});

const createPostCourseController = require('./controllers/createPostCourse');
app.post('/posts/course/store', createPostCourseController);

// searching
const searchController = require('./controllers/search');
app.get('/search', searchController);
// app.get('/search', (req, res) => {
// res.render('search') ;
// );
const searchResultController = require('./controllers/searResult');
app.post('/search/result', searchResultController);
// app.post('/search/result', async (req, res) => {
//    //    ListCourse.find({name : req.body.search}, (err, searchWords)
//    => {
//    //        console.log(err);
//    //       console.log(searchWords);
//    //     });
//    await ListCourse.find({name : {$regex : '.*' + req.body.search +
//    '.*'}},
//                          (err, searchWords) => {
//                              console.log(searchWords);
//                              if (searchWords.length > 0)
//                                  res.render('result', {searchWords});
//                              else
//                                  res.send('cannot find ');
//                          });
//    // res.redirect('/search');
//});

// REGISTER
//
//
const registerController = require('./controllers/register');
app.get('/register', registerController);
// app.get('/register', (req, res) => {
//    res.render('register');
//})

const userPostRegisterController = require('./controllers/userPostRegister');
app.post('/users/register', userPostRegisterController);
// app.post('/users/register', async (req, res) => {
//    await ListUser.create(req.body, (err, user) => {
//        if (user)
//            res.redirect('/register');
//        else
//            res.send(err);
//    });
//});

// LOGIN
//
//

const loginUserController = require('./controllers/loginUser');
app.post('/users/login', loginUserController);

const logoutController = require('./controllers/logout');
app.get('/users/logout', logoutController);

app.use((req, res) => res.render('notfound'));
app.listen(3000);
