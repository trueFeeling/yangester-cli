const fs = require('fs');
Promise.promisify = Promise.promisify || require('./promisify');
/**
 * 读取文件夹内容
 * @param {String} url 
 */
module.exports = readDirAsync = Promise.promisify(fs.readdir);