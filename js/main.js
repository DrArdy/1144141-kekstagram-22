const getRandomNumber = (min, max) => {
  if (max > min && min >= 0) {
    return Math.round(Math.random()*(max-min)+min);
  }
  else {
    return 0;
  }
}

const checkStringLength = (verifiableString, maxStringLength=140) => verifiableString.length <= maxStringLength;
