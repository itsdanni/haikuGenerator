//the Node.js require function takes a file path as its parameter, executes the code in the file, and then returns that file's module.exports.
var haiku = require('./haiku');
console.log(haiku.createHaiku());
