const fs = require('fs');
const path = require('path');
const readdir = require('./utils/readdir');
const fsStats = require('./utils/fsStats');
const unlink = require('./utils/unlinkAsync');
const rmdir = require('./utils/rmdir');
const readDirAsync = require('./utils/readdir');
const fstatAsync = require('./utils/fsStats');
const open = require('./utils/open');
const readFile = require('./utils/readFile');
let fileDir = [];
/**
 * 删除文件
 * @param {String} filePaths 文件路径
 * @param {Object} cmd 输入命令
 */
module.exports = function rm(filePaths, cmd) {
    if (Array.isArray(filePaths)) {
        filePaths.forEach(eachFilePath => {
            handelEachFielPath(eachFilePath, cmd);
        });
        return
    }
    //单个输入
    handelEachFielPath(filePaths, cmd);
}
/**
 * 处理每个文件夹路径
 * @param {String} filePath 每个文件夹路径
 * @param {Object} cmd 输入的多个命令参数
 */
function handelEachFielPath(filePath, cmd) {
    if (cmd.remove && cmd.force) {
        //强制删除所有文件及目录
        filePathArray = filePath.split('/');
        lastVal = filePathArray[filePathArray.length - 1];
        if (lastVal === '*') {
            if (filePathArray.length == 1) {
                // 输入参数为 *, 则删除当前目录下的所有文件
                filePath = process.cwd();
            } else {
                // 输入参数为 ./testDir/*, 则删除testDir目录下的所有文件
                filePathArray.pop();
                filePath = filePathArray.join('/');
            }
            walk(filePath).then(() => {
                fileDir.reverse()
                return removeDir(fileDir)
            }).then(()=>console.log('deleted successfully'))
            .catch(e => console.log(e))
            return
        }
        // 删除整个文件夹
        walk(filePath).then(() => {
            fileDir.reverse()
            return removeDir(fileDir)
        }).then(()=>{
            rmdir(filePath)
        }).then(()=>console.log('deleted successfully')).catch(e => console.log(e))
    } else {
        //删除单个文件
        unlink(filePath).then(()=>console.log('deleted successfully')).catch(e => console.log(e));
    }
}

/**
 * 删除空文件夹
 */

/**
 * 遍历文件夹
 * @param {String} dir 
 */
function walk(dir) {
    return readdir(dir).then(files => {
        return Promise.all(files.map(f => {
            f = path.join(dir, f);
            return fstatAsync(f);
        }));
    }).then(fileStats => {
        return Promise.all(fileStats.map(fs => {
            if (fs.isDirectory()) {
                fileDir.push(fs.dir)
                return walk(fs.dir)
            } else {
                unlink(fs.dir)
            }
        }))
    })
}

/**
 * 
 * @param {Array} dirs 置空后的所有文件夹目录
 */
function removeDir(dirs) {
    return Promise.all(dirs.map(
        dir => {
            return rmdir(dir)
        }
    ))
}