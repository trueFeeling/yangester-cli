const fs = require('fs');
Promise.promisify = Promise.promisify || require('./promisify');
/**
 * 删除单个文件
 */
module.exports = unlink = Promise.promisify(fs.unlink);