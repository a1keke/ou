//操作数据库

let mongodb = require('mongodb');
let querystring = require('querystring');
let http = require('http');
let mongodbClient = mongodb.MongoClient;

const BQG_URL = 'mongodb://localhost:27017/biquge';

const DIARY_URL = 'mongodb://localhost:27017/diary';

const BASEINFO_URL = 'mongodb://localhost:27017/baseInfo';


// 查
//查所有书
exports.getAllBooks = function (req,cb) {

    let allBooks = [];
    mongodbClient.connect(BQG_URL,(err,db)=>{
        if(err){
            console.log(err);
            db.close();
            cb({code:0,err});
        }
        db.collection('bookList').find({}).toArray((err,res)=>{
            allBooks = res.map((ele,i)=>{
                return {
                    index:ele.index,
                    name:ele.name
                }
            })
            cb({code:1,allBooks})
            
        })
    })
}
// 根据bid查一本书的所有章节
exports.getChaptersByBid = function (req,cb) {
    let chapters = [];
    let bid = req.query.bid;
    mongodbClient.connect(BQG_URL,(err,db)=>{
        if(err){
            console.log(err);
            db.close();
            cb({code:0,err});
        }
        db.collection(bid).find().toArray().then(result=> {
            result.map(item => {
                chapters.push({index:item.index,name:item.name})
            })
            db.close();
            cb({code:1,chapters});
        })
    })
}

exports.getChapter = function (req,cb) {
    let index,chaptername,chaptercontent;

    let bid = req.query.bid;
    let cid = req.query.cid*1;

    mongodbClient.connect(BQG_URL,(err,db)=>{
        if(err){
            console.log(err);
            db.close();
            cb({code:0,err});
            return false;
        }
        db.collection(bid).find({index:cid}).toArray().then(result=>{
            index = result[0].index;
            chaptername = result[0].name;
            chaptercontent = result[0].content;
            cb({code:1,index,chaptername,chaptercontent})
        })
            .catch(err=>{
                console.log(err);
                db.close();
                cb({code:0,err:'找不到这本书的这个章节'});
                return false;
            })
    })

}

exports.getBookNameBybid = function (req,cb) {
    let bid = req.query.bid*1;
    _getBookNameBybid(bid).then(bookname=>{
        cb({code:1,bookname});
    }).catch(err=>{
        console.log(err);
        cb({code:0,err});
    })
}
// 存一篇日记
exports.saveDiary = function (args,cb) {
    (
        async ()=>{
            let {title,content} = args;

            let {time,week} = _getNowFormatDate();

            let index = await _getDiaryLength();

            let db = await mongodbClient.connect(DIARY_URL);

            let diaryDB = await db.collection('diary');

            try{
                await diaryDB.insert({index:index+1,time,week,title,content});

                await db.close();

                await cb({code:1});

            }catch (e){
                await cb({code:0})
            }



        }
    )()

}
// 取出所有日记
exports.getAllDiary = function (cb) {

    (
        async()=>{
            let db = await mongodbClient.connect(DIARY_URL);

            let diary = await db.collection('diary');

            let diaryArr = await diary.find({}).toArray();


            diaryArr = diaryArr.map((ele,i)=>{
               return {
                   index:ele.index,
                   time:ele.time,
                   week:ele.week,
                   title:ele.title,
                   content:ele.content
               }
            });

            await db.close();

            await cb({diary:diaryArr.reverse()});

        }
    )()

}
// 取出一篇日记
exports.getDiary = function (args,cb) {
    (
        async(args,cb)=>{
            let {title} = args;

            let db = await mongodbClient.connect(DIARY_URL);

            let diaryDB = await db.collection('diary');

            try{

                let diary = await diaryDB.find({title}).toArray();
                await db.close();

                diary.length?cb({code:1,diary:diary[0]}):cb({code:0,err:'cant find'});

            }catch (e){
                await db.close();
                await cb({code:0,err:e})
            }

        }
    )(args,cb)
}




//存ip
exports.saveIp = function (req) {
    (
        async(req)=>{
            let ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');

            let db = await mongodbClient.connect(BASEINFO_URL);

            let ipDB = await db.collection('ip');

            let ipArr = await ipDB.find({ip}).toArray();
            //如果存在ip，更新时间
            if(ipArr.length){
                await ipDB.update({ip},{$set:{time:_getNowFormatDate().time}});
                await db.close();
                return false;
            }

            let ipInfo = null
            let opt = {
                host:'ip.taobao.com',
                method:'GET',
                path:'/service/getIpInfo.php?ip='+ip,
            };
            let searchIp = await http.request(opt,res=>{
                res.setEncoding('utf8');
                res.on('data',async chunk=>{
                    let _chunk = JSON.parse(chunk);
                    //没查到ip的信息
                    if(_chunk.code || _chunk.data.country==='内网ip'){
                        await ipDB.insert({ip,time:_getNowFormatDate().time});
                        await db.close();
                        return false;
                    }
                    ipInfo = _chunk.data;
                    let {country,area,region,city,county,isp} = ipInfo
                    await ipDB.insert({country,area,region,city,county,isp,ip,time:_getNowFormatDate().time});
                    await db.close();
                });
            });
            searchIp.on('error',e=>{
                console.log('error:'+e);
            })
            searchIp.end();
        }
    )(req)

}




//根据传入的bookid查找书名
function _getBookNameBybid(bid) {
    return new Promise((res,rej)=>{
        mongodbClient.connect(BQG_URL,(err,db)=>{
            if(err){rej('getBookNameBybid db error')};
            db.collection('bookList')
                .find({index:bid}).toArray()
                .then(result=>{
                    db.close();
                    result.length?res(result[0].name):rej('getBookNameBybid result error');
            })


        })
    })
}
// 获取当前时间和日期
function _getNowFormatDate() {
    let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let date = new Date();
    let day = date.getDay();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let time = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return {time,week:weeks[day]};
}
// 获取当前diary的总条数
function _getDiaryLength() {
    return (
        async ()=>{

            let db = await mongodbClient.connect(DIARY_URL);

            let diary = await db.collection('diary');

            let stats = await diary.stats();

            await db.close();

            return stats.count;

        }
    )()
}