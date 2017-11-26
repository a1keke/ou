// 路由表
// let file = require('./../model/file.js');
let mongodb = require('./../model/mongodb.js')
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

exports.show404 = function (req,res) {

    res.render('404');

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
// exports.getChaptersByName =function (req,res) {
//
//     mongodb.getChaptersByName(req,result=>{
//
//         res.json(result);
//
//     })
//
// }
exports.saveDiary = function (req,res) {
    let data = req.body;
    
    let {title,content} = data;

    mongodb.saveDiary({title,content},(result)=>{
        res.json(result);
    })
}

exports.getAllDiary = function (req,res) {
    mongodb.getAllDiary(result=>{
        res.json(result);
    })
}
