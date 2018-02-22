// 路由表
// let file = require('./../model/file.js');
let mongodb = require('./../model/mongodb.js');
let file = require('./../model/file.js');
let validator = require('./../util/validator.js').validator;
let serverCrypto = require('./../util/_crypto.server.js');
//public
exports.baseInfo = function (req,res) {
    let ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    let {appVersion,platform} = req.body;
    let nickname = req.session.nickname?req.session.nickname:'';
    let account = req.session.account?req.session.account:'';
    mongodb.saveBaseInfo(req,{ip,appVersion,platform,nickname,account},result=>{
        res.json(result);
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
    let {
        account:sessionAccount,
        nickname:sessionNickname
    } = req.session;
    if(!sessionAccount || !sessionNickname){
        res.json({code:0,err:'未登录，请先登录'});
        return false;
    }
    let {title,content,account} = req.body;

    if(sessionAccount!==account){
        res.json({code:0,err:'异常的状态'});
        return false;
    }

    mongodb.saveDiary({title,content,account},(result)=>{
        res.json(result);
    })
}

exports.getAllDiary = function (req,res) {
    let account = req.session.account?req.session.account:'qianke';
    let nextPage = req.body.nextPage?req.body.nextPage:1;
    mongodb.getAllDiary({account,nextPage},result=>{
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
    let {title} = req.body;
    let account = req.session.account?req.session.account:'qianke';
    mongodb.getDiary({title,account},result=>{
        res.json(result)
    })
}
exports.deleteDiary = function (req,res) {
    let {
        account:sessionAccount,
        nickname:sessionNickname
    } = req.session;
    if(!sessionAccount || !sessionNickname){
        res.json({code:0,err:'未登录，请先登录'});
        return false;
    }
    let {index,account} = req.body;

    if(sessionAccount!==account){
        res.json({code:0,err:'异常的状态'});
        return false;
    }
    mongodb.deleteDiary({index,account},result=>{
        res.json(result);
    })

}
exports.signUp = function (req,res) {
    let {info} = req.body;
    if(!info){
        res.json({code:0,err:'提交信息异常，请重新提交'})
        return false;
    }
    try {
        info = JSON.parse(serverCrypto.pubDecrypt(info));
    }catch (e){
        res.json({code:0,err:'提交信息异常，请重新提交'})
        return false;
    }
    let {nickname,account,password,email,appVersion,platform} = info;

    if(!nickname || !account || !password || !email){
        res.json({code:0,err:'请完成所有必填项'})
        return false;
    }
    let nicknameErr = validator.valiOneByValue('nickname',nickname);
    let accountErr = validator.valiOneByValue('account',account);
    let passwordErr = validator.valiOneByValue('password',password);
    let emailErr = validator.valiOneByValue('email',email);
    if(nicknameErr && accountErr && passwordErr && emailErr){
        res.json({code:0,err:'格式错误，请更正'})
        return false;
    }
    let ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    mongodb.saveSignUpInfo(
        req,
        {ip,nickname,account,password,email,appVersion,platform},
        result=>{res.json(result);
    })
}
exports.login = function (req,res) {
    let {info} = req.body;
    if(!info){
        res.json({code:0,err:'提交信息异常，请重新提交'})
        return false;
    }
    try {
        info = JSON.parse(serverCrypto.pubDecrypt(info));
    }catch (e){
        res.json({code:0,err:'提交信息异常，请重新提交'})
        return false;
    }
    let {account,password} = info;

    if(!account || !password){
        res.json({code:0,err:'请完成所有必填项'})
        return false;
    }
    let accountErr = validator.valiOneByValue('account',account);
    let passwordErr = validator.valiOneByValue('password',password);
    if(accountErr && passwordErr){
        res.json({code:0,err:'格式错误，请更正'})
        return false;
    }
    mongodb.login(req,{account,password},result=>{res.json(result)})
}
exports.logout = function (req,res) {
    req.session.destroy(err=>{
        res.clearCookie('ouyuqin');
        mongodb.getAllDiary({account:'qianke',nextPage:1},result=>{
            res.json(result);
        })
    })
}
exports.saveMsg = (req,res)=>{

    let {
        account:sessionAccount,
        nickname:sessionNickname
    } = req.session;
    if(!sessionAccount || !sessionNickname){
        res.json({code:0,err:'未登录，请先登录'});
        return false;
    }
    let {account,content} = req.body;

    if(sessionAccount!==account){
        res.json({code:0,err:'异常的状态'});
        return false;
    }
    if(content.length==0){
        res.json({code:0,err:'留言内容不能为空'});
        return false;
    }
    mongodb.saveMsg({account,content},result=>{
        res.json(result)
    })
}
exports.getAllMsg = (req,res)=>{
    let {nextPage} = req.body;
    mongodb.getAllMsg(nextPage,result=>{
        res.json(result);
    })

}
exports.getQuestionList = (req,res)=>{
    mongodb.getQuestionList(result=>{
        res.json(result);
    })
}

exports.addQuestion = (req,res)=>{
    let {ques,answ} = req.body;
    if(!ques || !answ){
        res.json({code:0,err:'内容不能为空'});
        return false;
    }
    //暂时不做登录判断
    // let {
    //     account:sessionAccount,
    //     nickname:sessionNickname
    // } = req.session;
    // if(!sessionAccount || !sessionNickname){
    //     res.json({code:0,err:'未登录，请先登录'});
    //     return false;
    // }
    // if(sessionAccount!==account){
    //     res.json({code:0,err:'异常的登录状态'});
    //     return false;
    // }
    // if(sessionAccount!==''){
    //     res.json({code:0,err:'没有权限添加问题'});
    //     return false;
    // }
    mongodb.addQuestion({ques,answ},result=>{
        res.json(result);
    });
}