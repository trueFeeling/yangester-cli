const fs = require('fs');
Promise.promisify = Promise.promisify || require('./utils');
module.exports = fsRename = Promise.promisify(fs.rename);