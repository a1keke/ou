
let express = require('express');
let path = require('path')
let ejs = require('ejs');
let bodyParser = require('body-parser');
//处理multipart/form-data类型的post
let multer = require('multer');
let upload = multer({dest:'./static/upload'})
let router = require('./controller');
var app = express();
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname,'views'));
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit:'200kb' }));
app.use('/static',express.static('./static'))
app.use('/jianshu', function(req, res) {
    res.render('jianshu/index', '');
});
//接口
app.use('/diary/getAllDiary',router.getAllDiary);
app.post('/diary/saveDiary',router.saveDiary);
app.post('/diary/upImages',upload.array('images'),router.upImages);
app.post('/diary/deleteImage',router.deleteImage);
app.get('/biquge/interface/getAllBooks',router.getAllBooks);
app.get('/biquge/interface/getChaptersByBid',router.getChaptersByBid);
// app.get('/biquge/interface/getChaptersByName',router.getChaptersByName);
app.get("/biquge/interface/getChapter",router.getChapter)
app.get('/biquge/interface/getBookName',router.getBookNameBybid);

// 页面
//页面--日记
app.use('/diary',(req,res)=>{
    res.render('diary/index','')
})
// 页面--笔趣阁
app.use('/biquge/:bookid/:chapter',(req,res)=>{
    res.render('biquge/readPage','')
})
app.use('/biquge/:bookid',(req,res)=>{
    res.render('biquge/bookDetail','')
})
app.use('/biquge', function(req, res) {
    res.render('biquge/index', '');
});

app.listen(80);
