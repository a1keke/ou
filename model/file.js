
let fs = require('fs');
let path = require('path');
let uuid = require('uuid');
let serverCrypto = require('./../util/_crypto.server.js')
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
        let key = serverCrypto.priEncrypt(filename);
        let mime = _getMIME(mimetype);
        let _path = path+mime;
        fs.renameSync(path,path+mime);
        images.push({name:filename,url:'/'+_path,key})
    })

    cb({code:1,images})

}

exports.deleteImage = function (args,cb) {

    let {name,key,url} = args;

    if(!key || name !== serverCrypto.priDecrypt(key)){
        cb({code:0,err:'key error'});
        return false;
    }

    fs.unlink(path.resolve(__dirname,'./../')+url,err=>{
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
