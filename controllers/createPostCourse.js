const ListCourse = require('../models/listCourse');
const path       = require('path');

module.exports = async (req, res) => {
    let image = req.files.image;
    let pdf   = req.files.pdf;
    image.mv(path.resolve(__dirname, '..', 'public/image', image.name));
    pdf.mv(path.resolve(__dirname, '..', 'public/pdf', pdf.name));
    await ListCourse.create({
        ...req.body,
        image : '/image/' + image.name,
        pdf : '/pdf/' + pdf.name
    });
    res.redirect('/up-list-course');
};
