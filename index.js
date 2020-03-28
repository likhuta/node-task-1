const { program } = require("commander");
const process = require('process');
const fs = require('fs');
const validator = require('./validator');

program.storeOptionsAsProperties(false)
program
  .option('-s, --shift <number>', 'necessary shift')
  .option('-a, --action <type>', 'kind of action')
  .option('-i, --input <fileName>', 'path to file')
  .option('-o, --output <fileName>', 'path to output file');

const programOptions = program.opts();
program.parse(process.argv);
// console.log(process.argv)
// check requred param: -s, -a

const resultOfValidation = validator(programOptions);


if(programOptions.shift) {
  console.log(program.shift)
}

if(programOptions.action) {
  console.log(programOptions.action)
}
console.log(programOptions.input, '----program.input')
if(programOptions.input) {
  console.log(programOptions.input, '----program.input')
  const fileContent = fs.readFileSync(`${programOptions.input}`, 'utf-8')
  console.log(fileContent)
}

if(programOptions.output) {
  const fileContent = fs.readFileSync(`${programOptions.output}`, 'utf-8')
  console.log(fileContent)
}



