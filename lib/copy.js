const fs = require('fs');
const readdir = require('./utils/readdir');
const fstatSync = require('./utils/fsStats');
const mkdir = require('./mkdir');
const rm = require('./rm');
const path = require('path');
module.exports = function copy(src, dest, cmd) {
    // 先判断是文件还是文件夹
    return fstatSync(src).
        then(result => {
            if (result.isFile()) {
                console.log(result)
                copyFile(src, dest)
                return null
            } else {
                // 是一个文件夹
                return walk(src, dest)
            }
        })
}

function copyDirectory(origin, dest) {
    fs.createReadStream(origin).pipe(fs.createWriteStream(path.join(dest, origin)));
}

function copyFile(origin, dest){
    fileName = (path.parse(origin)).base;
    fs.createReadStream(origin).pipe(fs.createWriteStream(path.join(dest, fileName)));
}

function walk(directory, dest) {
    // 遍历文件夹
    mkdir([path.join(dest, directory)])
        .then(
            () => {
                return readdir(directory)
            }
        )
        .then(files => {
            return Promise.all(
                files.map( f =>{
                    f = path.join(directory, f)
                    return fstatSync(f)
                })
            )
        })
        .then(
            fileStats => {
                return Promise.all(
                    fileStats.map(fileStat => {
                        if (fileStat.isDirectory()) {    
                            return walk(fileStat.dir, dest)
                        } else {
                            copyDirectory(fileStat.dir, dest)
                        }
                    }))
            }
        ).catch(e => {
            console.log(e)
        })
}