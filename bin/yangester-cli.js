#!/usr/bin/env node
const program = require('commander');
/**
 * touch
 */
program
       .command('touch <dir>')
       .action(function(dir){
           console.log(dir)
       })

program.parse(process.argv)