let Validation = require('./validation.js');

const validator = new Validation.Validator();

validator.addByValue('nickname',[
    {strategy: 'isEmpty', errorMsg: '昵称不能为空'},
    {strategy: 'hasSpace', errorMsg: '昵称不能有空格'},
    {strategy: 'maxLength:9', errorMsg: '昵称最长为9'},
    {strategy: 'minLength:3', errorMsg: '昵称最短为3'}
]);
validator.addByValue('account',[
    {strategy: 'isEmpty', errorMsg: '账号不能为空'},
    {strategy: 'onlyNumAndStr', errorMsg: '账号只能是英文和字母'},
    {strategy: 'maxLength:15', errorMsg: '账号最长为15'},
    {strategy: 'minLength:6', errorMsg: '账号最短为6'}
]);
validator.addByValue('password',[
    {strategy: 'isEmpty', errorMsg: '密码不能为空'},
    {strategy: 'onlyNumAndStr', errorMsg: '密码只能是英文和字母'},
    {strategy: 'maxLength:15', errorMsg: '密码最长为15'},
    {strategy: 'minLength:6', errorMsg: '密码最短为6'}
]);
validator.addByValue('email',[
    {strategy: 'isMail', errorMsg: '请输入正确的email'}
]);
validator.addByValue('search',[
    {strategy: 'onlyNumAndStr', errorMsg: '请输入关键字首字母或者数字，如要搜索桑尼，请输入sn'}
]);
exports.validator = validator;