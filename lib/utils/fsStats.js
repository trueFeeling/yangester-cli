const fs = require('fs');
const path = require('path');
Promise.promisify = Promise.promisify || require('./promisify');
let cacheObj = {};
/**
 * 读取文件状态 => 判断是文件还是文件夹
 */

module.exports = fstatSync = Promise.promisify(fs.stat, true);
