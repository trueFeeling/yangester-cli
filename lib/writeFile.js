const fs = require('fs');
const open = require('./utils/open');
/**
 * 
 * @param {String} file 文件绝对路径
 * @param {String} data 写入文件的数据, 可为空
 */
module.exports = function writeFile(file, data) {
    return open(file, 'wx').then(path => {
        path = [path];
        return handleEachFile(path, data)
    })
}

function handleEachFile(path, data) {
    return new Promise((res, rej) => {
        path.forEach(path => {
            fs.writeFile(path, data, err => {
                if (err) {
                    rej(err);
                }
                res(': been created successfully')
            });
        });
    })
}
