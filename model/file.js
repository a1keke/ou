
let fs = require('fs');
// let formidable = require('formidable');
let path = require('path');
let uuid = require('uuid');
let crypto = require('crypto');
const SECRET_KEY = 'qianke';
const MIMES = 'image/jpeg,image/png,image/bmp'
exports.upImages = function (req,cb) {

    let {files} = req;

    // 非法检测
    let errFlag = files.some(ele=> MIMES.indexOf(ele.mimetype) === -1)
    if(errFlag){
        files.map(ele=>{
            fs.unlinkSync(ele.path);
        })
        cb({code:0,err:'illegal mimetype'})
        return false;
    }

    let images = [];

    files.map((ele,i)=>{
        let {mimetype,filename,path} = ele;
        let key = _encrypt(filename);
        let mime = _getMIME(mimetype);
        let _path = path+mime;
        fs.renameSync(path,path+mime);
        images.push({name:filename,url:'/'+_path,key})
    })

    cb({code:1,images})

}

exports.deleteImage = function (args,cb) {

    let {name,key,url} = args;

    if(!key || name !== _decrypt(key)){
        cb({code:0,err:'key error'});
        return false;
    }

    fs.unlink(url,err=>{
        err?cb({code:0,err:'delete err'}):cb({code:1});
    })
}


function _getMIME(type) {
    let MIME = '';
    switch (type){
        case 'image/jpeg':
            MIME = '.jpg'
            break;
        case 'image/png':
            MIME = '.png'
            break;
        case 'image/bmp':
            MIME = '.bmp'
            break;
    }
    return MIME;
}

function _encrypt(str) {
    let enc = '';
    let cipher = crypto.createCipher('aes192', SECRET_KEY);
    enc += cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}

function _decrypt(str) {
    let dec = '';
    let decipher = crypto.createDecipher('aes192', SECRET_KEY);
    dec += decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}