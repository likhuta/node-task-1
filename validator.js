const fs = require('fs');


module.exports = validator = params => {
  let errMess = [];
  let isHaveInputFile = true;
  let isHaveOutFile = true;

  if (!params.shift) {
    return { isCorrect: false, errMess };

  }

  if ( !Number.parseInt(params.shift, 10) ) {
    errMess.push("Смещение должно быть в цифровом формате");
  } 
  if (!params.action == ("decode" || 'encode')) {
    errMess.push("Неккоректно введен тип действия ");
  }
  if (!params.output) {
    // errMess.push("Не введен файл для ввода ");
    isHaveOutFile = false;
  } 
  if (!params.input) {
    errMess.push("Не введен файл для обработки ");
    isHaveInputFile = false;

  }

  if ( params.input && !fs.existsSync(params.input)) {
    errMess.push("Отсутствует указанный файл ввода");
    isHaveInputFile = false;
  }

  if ( params.output &&!fs.existsSync(params.output)) {
    errMess.push("Отсутствует указанный файл ввывода");
    isHaveOutFile = false;

  }
  if (errMess.length > 0) {
    return { isCorrect: false, errMess };
  } else {
    return { isCorrect: true, errMess, isHaveInputFile, isHaveOutFile };
  }

};
