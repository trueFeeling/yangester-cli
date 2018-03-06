const fs = require('fs');
Promise.promisify = Promise.promisify || require('./promisify');
/**
 * 删除空文件夹
 */
module.exports = rmdir = Promise.promisify(fs.rmdir);