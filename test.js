console.clear();
function generateRandomString() {
  const charArr = ("abcdefghijklmnopqrstuvwxyz").split("");
  const charsToGenerate = 6;
  let randStringArr = [];
  for (let i = 0; i < charsToGenerate; i++) {
    let randNumber = Math.floor(Math.random() * 26);
    let randChar = charArr[randNumber];
    randStringArr.push(randChar);
  }
  return randStringArr.join("");
}
console.log(generateRandomString());