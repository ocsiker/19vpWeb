const express    = require('express');
const path       = require('path');
const mongoose   = require('mongoose');
const ejs        = require('ejs');
const bodyParser = require('body-parser');
const ListCourse = require('./models/listCourse');
const fileUpload = require('express-fileupload');
const ListUser   = require('./models/listUser');

// for login

const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/Courses', {useNewUrlParser : true});

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());

app.get('/', function(req, res) {
    //    res.sendFile(path.resolve('JSAV.pdf'));
    res.sendFile(path.resolve("public/pages/index.html"));
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
app.get('/detail/:id', async (req, res) => {
    const detailcourse = await ListCourse.findById(req.params.id);
    res.render('detail', {detailcourse});
});

// creating form post course
app.get('/up-list-course', (req, res) => {
    res.render('upListCourse');
})
// creating form post course
app.post('/posts/course/store', async (req, res) => {
    let image = req.files.image;
    let pdf   = req.files.pdf;
    image.mv(path.resolve(__dirname, 'public/image', image.name));
    pdf.mv(path.resolve(__dirname, 'public/pdf', pdf.name));
    await ListCourse.create({
        ...req.body,
        image : '/image/' + image.name,
        pdf : '/pdf/' + pdf.name
    });
    res.redirect('/up-list-course');
});
// searching

app.get('/search', (req, res) => {
    res.render('search');
});

app.post('/search/result', async (req, res) => {
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
});

// REGISTER
//
//
app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/users/register', async (req, res) => {
    await ListUser.create(req.body, (err, user) => {
        if (user)
            res.redirect('/register');
        else
            res.send(err);
    });
});

// LOGIN
//
//

app.listen(3000);
