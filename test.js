function generateRandomString() {
  const charsArr = ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789").split("");
  const charsToGenerate = 6;
  let randString = [];
  for(let i = 0; i < charsToGenerate; i++){
    let randNumber = Math.floor(Math.random() * 61);
    randString.push(charsArr[randNumber])   
  }
  return randString.join("");
}

console.log(generateRandomString());