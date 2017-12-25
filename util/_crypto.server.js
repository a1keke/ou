let crypto = require('crypto');
const SECRET_KEY = 'qianke';
const PUBLICK_KEY = 'ouyuqin';
exports.priEncrypt = str=> {
    let enc = '';
    let cipher = crypto.createCipher('aes192', SECRET_KEY);
    enc += cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}
exports.priDecrypt = str=> {
    let dec = '';
    let decipher = crypto.createDecipher('aes192', SECRET_KEY);
    dec += decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
exports.pubEncrypt = str=> {
    let enc = '';
    let cipher = crypto.createCipher('aes192', PUBLICK_KEY);
    enc += cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}
exports.pubDecrypt = str=> {
    let dec = '';
    let decipher = crypto.createDecipher('aes192', PUBLICK_KEY);
    dec += decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}