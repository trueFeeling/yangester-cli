const fs = require('fs');
/**
 * 
 * @param {String} dirs 
 */
module.exports = function mkdir(dirs) {
    return new Promise((res, rej) => {
        dirs.forEach(dir => {
            fs.mkdir(dir, err => {
                if (err) {
                    if(err.code === 'EEXIST'){
                    }
                    rej(err)
                }
                res(dir)
            })
        });
    })
}


