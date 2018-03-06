const fs = require('fs');
Promise.promisify = Promise.promisify || require('./promisify');
/**
 * 读取文件内容
 */
module.exports = readFile = Promise.promisify(fs.readFile);