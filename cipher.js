module.exports = cipher = (inputText, typeCode, shift) => {
  let initAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  codeAlphabet = makeCodeAlphabet(initAlphabet, shift);
  let result;
  if (typeCode === "encode") {
    result = doCipher(inputText, initAlphabet, codeAlphabet);
  } else if (typeCode === "decode") {
    result = doCipher(inputText, codeAlphabet, initAlphabet);
  }
  return result;
};

function makeCodeAlphabet(initAlphabet, shift) {
  let codeAlphabet;
  shift = shift % initAlphabet.length;
    initAlphabet = Array.from(initAlphabet);
    let deltaChar = initAlphabet.splice(shift);
    codeAlphabet = deltaChar.concat(initAlphabet);
  return codeAlphabet.join("");
}

function doCipher(messageInput, initAlphabet, codeAlphabet) {
  let oppositeMessage = [];
  message = messageInput.toUpperCase();

  for (let i = 0; i < message.length; i++) {
    if (initAlphabet.indexOf(message[i]) !== -1) {
      let encodeLetter = codeAlphabet[initAlphabet.indexOf(message[i])];
      oppositeMessage.push(encodeLetter);
    } else {
      oppositeMessage.push(message[i]);
    }
  }
  oppositeMessage = correctRegistr(messageInput, oppositeMessage);
  return oppositeMessage.join("");
}

function correctRegistr(messageInput, messageOutput) {
  for (let i = 0; i < messageInput.length; i++) {
    if (messageInput.charCodeAt(i) >= 65 && messageInput.charCodeAt(i) <= 90) {
      messageOutput[i] = messageOutput[i].toUpperCase();
    } else {
      messageOutput[i] = messageOutput[i].toLowerCase();
    }
  }
  return messageOutput;
}
