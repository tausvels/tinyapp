console.clear();
function generateRandomString() {
  const char = ("abcdefghijklmnopqrstuvwxyz");
  const num = ("0123456789");
  const charsToGenerate = 2;
  let randStringArr = [];
  for (let i = 0; i < charsToGenerate; i++) {
    let randNumber = Math.floor(Math.random() * 26);
    let randChar = (char.split(""))[randNumber];
    randStringArr.push(randChar);
    randNumber = Math.floor(Math.random() * 26);
    let randCharCap = ((char.toUpperCase()).split(""))[randNumber];
    randStringArr.push(randCharCap);
    randNumber = Math.floor(Math.random() * 10);
    let randNum = (num.split(""))[randNumber];
    randStringArr.push(randNum);
  }
  return randStringArr.join("");
}
console.log(generateRandomString());