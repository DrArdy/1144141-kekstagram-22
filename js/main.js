const getRandomNumber = (min, max) => {
  if (max>min && min>=0) {
   return Math.round(Math.random()*(max-min)+min);
 }
  else {
   console.log(`Диапазон функции getRandomNumber задан некорректно: min=${min}, max=${max}. Условие правильного задания диапазона: max>min && min>=0`);
   }
}

const checkStringLength = (verifiableString, maxStringLength=140) => {
  if (verifiableString.toString().length<=maxStringLength) {
    return true;
  }
  else {
    return false;
  }
}
