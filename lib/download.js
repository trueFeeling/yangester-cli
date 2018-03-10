
const path = require('path');
Promise.promisify = Promise.promisify || require('./utils/promisify');
cmd = Promise.promisify(require('child_process').exec);
module.exports = cmds = function(){
    return cmd('git clone https://github.com/trueFeeling/vue-template.git');
}

