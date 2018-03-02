#!/usr/bin/env node
var args = process.argv.splice(2)
//process是一个全局对象，argv返回的是一组包含命令行参数的数组。
//第一项为”node”，第二项为执行的js的完整路径，后面是附加在命令行后的参数
console.log(args)
console.log(process.execPath)
console.log(__dirname)
console.log(process.cwd())