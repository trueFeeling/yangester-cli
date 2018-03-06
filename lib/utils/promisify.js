
/**
 * 对回调函数f进行Promise化
 */
module.exports = function promisify(f, add) {
    return function (...arg) {
        let args = [].slice.call(arg);
        return new Promise((resolve, reject) => {
            args.push(function (err, result) {
                if (err) {
                    reject(err);
                } else if(add === true) {
                    result.dir = args[0];
                    resolve(result);
                } else {
                    resolve(result);
                }
            });
            f.apply(null, args);
        });
    }
};