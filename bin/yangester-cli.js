#!/usr/bin/env node
const program = require('commander');
const writeFile = require('../lib/writeFile');
const rm = require('../lib/rm');
const path = require('path');
const cp = require('../lib/copy');
const mkdir = require('../lib/mkdir');
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
            .then(dir => {
                console.log(dir, ': been created successfully')
            })
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
            .then(() => {
                console.log('successfully')
            })
            .catch(e => {
                console.log(e)
            })
    });

program.parse(process.argv)