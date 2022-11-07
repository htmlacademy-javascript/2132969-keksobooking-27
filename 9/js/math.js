const randomNumber = (firstNumber, lastNumber) => (firstNumber >= 0 && lastNumber >= 0 && firstNumber <= lastNumber ? Math.round(Math.random() * (lastNumber - firstNumber) + firstNumber) : NaN);
randomNumber(-0.0, 10);

const randomNumberWithComma = (firstNumber, lastNumber, symbolsAfterComma) => (firstNumber >= 0 && lastNumber >= 0 && firstNumber <= lastNumber ? (Math.random() * (lastNumber - firstNumber) + firstNumber).toFixed(symbolsAfterComma) : NaN);
randomNumberWithComma(-0.0, 10, 10);

const formatNumber = (number) => (number < 10) ? `0${number}` : number;
formatNumber();

export {
  randomNumber,
  randomNumberWithComma,
  formatNumber};
