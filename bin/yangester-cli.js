#!/usr/bin/env node
const program = require('commander');
const writeFile = require('../lib/writeFile');
const rm = require('../lib/rm');
const path = require('path');
const cp = require('../lib/copy');
const mkdir = require('../lib/mkdir');
const re = require('../lib/rename');
const vue = require('../lib/vue');
/**
 * touch 创建新文件
 */
program
    .command('touch <filePath> [otherFilePaths...]')
    .action((filePath, otherFilePaths) => {
        filePath = [filePath];
        if (otherFilePaths) {
            filePath.push(...otherFilePaths);
        }
        writeFile(filePath, '')
            .then(info => {
                console.log(filePath + info);
            }).catch(e => {
                console.log(e)
            });
    });

/**
 * mkdir 创建新文件夹
 */
program
    .command('mkdir <dir> [otherDirs...]')
    .action((dir, otherDirs) => {
        dir = [dir];
        if (otherDirs) {
            dir.push(...otherDirs);
        }
        mkdir(dir)
            .catch(e => {
                console.log(e)
            });
    });
/**
 * 删除文件/文件夹
 */
program
    .command('rm <dir> [otherDirs...]')
    .option('-r, --remove', 'remove all the files in this directory')
    .option('-f, --force', "without get user's permission")
    .action((dir, otherDirs, cmd) => {
        dir = [dir];
        if (otherDirs) {
            dir.push(...otherDirs);
        }
        rm(dir, cmd)
    });

/**
 * 复制文件
 */

program.command('cp <src> <dest>')
    .option('-i, --info', 'ask permission when there has been the same thing in the dest')
    .action((src, dest, cmd) => {
        cp(src, dest, cmd)
            .catch(e => {
                console.log(e)
            })
    });

/**
 * 修改文件名
 */

program.command('re <name> <newName>')
    .action((name, newName) => {
        re(name, newName)
            .catch(e => {
                console.log(e)
            })
    });
/**
 * 初始化项目
 */

program.command('vue <name>')
    .action(name => {
        vue(name).catch(e=>console.log(e));
    });

program.parse(process.argv)