const { program } = require("commander");
const process = require("process");
const fs = require("fs");
const validator = require("./validator");
const cipher = require("./cipher");

program.storeOptionsAsProperties(false);
program
  .option("-s, --shift <number>", "necessary shift")
  .option("-a, --action <type>", "kind of action")
  .option("-i, --input <fileName>", "path to file")
  .option("-o, --output <fileName>", "path to output file");

const programOptions = program.opts();
program.parse(process.argv);


const resultOfValidation = validator(programOptions);

function readInitDate(programOptions, prevMessage) {
  let { shift, action, input, output } = { ...programOptions };
  let createReadStreamInput;
  let writeableStreamOutput;


  if (resultOfValidation.isHaveInputFile) {
    createReadStreamInput = fs.createReadStream(`${input}`, "utf8");

    createReadStreamInput.on("data", function(chunk) {
      let codeMessage = cipher(chunk, action, shift);
      let message = prevMessage + "\n" + codeMessage;
      if (resultOfValidation.isHaveOutFile) {
        writeableStreamOutput = fs.createWriteStream(`${output}`, "utf8");
        writeableStreamOutput.write(message, "utf8");
      } else {
        let codeMessage = cipher(chunk, action, shift);
        let message = prevMessage + "\n" + codeMessage;
        process.stdout.write(message);
        process.exit(200);
      }

    });
  } 
}

if (!resultOfValidation.isCorrect) {
  process.stdout.write(resultOfValidation.errMess.join("\n"));
  process.exit(1);
} else {
  if (resultOfValidation.isHaveOutFile) {
    readPrevData(programOptions.output);
  } else {
    readInitDate(programOptions, null);
  }
}

function readPrevData(output) {
  let createReadStreamOutput = fs.createReadStream(`${output}`, "utf8");
  createReadStreamOutput.on("data", function(chunk) {
    readInitDate(programOptions, chunk);
  });
}
