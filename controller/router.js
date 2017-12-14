// 路由表
// let file = require('./../model/file.js');
let mongodb = require('./../model/mongodb.js');
let file = require('./../model/file.js');
//public
exports.public = function (req,res,next) {
    let ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    console.log(ip);
    next();
}

exports.showIndex = function (req,res) {

    file.getAllAlbumDir((albumDir)=>{

        res.render('index',{
            album : albumDir
        });

    });

};

exports.showAblum =function (req,res,next) {

    let albumName = req.params.albumName;

    if(albumName==='favicon.ico'){return false;}

    file.getImgByAlbumName(albumName,next,(imgArr)=>{

        res.render('album',{
            albumName,
            files:imgArr
        })

    });

}

exports.doupByGet = function (req,res) {

    file.getAllAlbumDir((albumDir)=>{

        res.render('doup',{albumDir});

    })

}

exports.doupByPost = function (req,res) {
    file.doup(req,()=>{

        res.send('ok');

    });
}
//笔趣阁
exports.getBookNameBybid = function (req,res) {
    mongodb.getBookNameBybid(req,result=>{
        res.json(result);
    })
}
exports.getAllBooks = function (req,res) {
    mongodb.getAllBooks(req,result=>{
        res.json(result);
    })

}

exports.getChaptersByBid =function (req,res) {

    mongodb.getChaptersByBid(req,result=>{

        res.json(result);

    })

}

exports.getChapter = function (req,res) {

    mongodb.getChapter(req,result=>{
        res.json(result);
    })

}
//diary
exports.saveDiary = function (req,res) {
    let {title,content} = req.body;
    
    mongodb.saveDiary({title,content},(result)=>{
        res.json(result);
    })
}

exports.getAllDiary = function (req,res) {
    mongodb.getAllDiary(result=>{
        res.json(result);
    })
}
exports.upImages = function (req,res) {
    file.upImages(req,(result)=>{
        res.json(result);
    })
}
exports.deleteImage = function (req,res) {
    let {name,key,url} = req.body;
    file.deleteImage({name,key,url},result=>{
        res.json(result);
    })
}
exports.getDiary = function (req,res) {
    let {title} = req.body
    mongodb.getDiary({title},result=>{
        res.json(result)
    })
}

function getClientIp(req) {  
        return req.headers['x-forwarded-for'] ||  
        req.connection.remoteAddress ||  
        req.socket.remoteAddress ||  
        req.connection.socket.remoteAddress;  
}  
