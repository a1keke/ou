
let fs = require('fs');
let formidable = require('formidable');
let path = require('path');

exports.upImages = function (req,cb) {
    let form = new formidable.IncomingForm();

    form.uploadDir = path.resolve(__dirname,'./../static/resource');

    form.parse(req,(err,fields,files)=>{
        if(err){
            console.log(err);
            cb();
        }
        let oldPath = files.images.path;
        cb();
    })

}