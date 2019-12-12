// -------- HELPER FUNCTION ------------- //
const generateRandomString = function() {
  const charsArr = ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789").split("");
  const charsToGenerate = 6;
  let randString = [];
  for (let i = 0; i < charsToGenerate; i++) {
    let randNumber = Math.floor(Math.random() * 61);
    randString.push(charsArr[randNumber]);
  }
  return randString.join("");
};

const findUserByProp = function(queryParam) {
  for (const id in userData) {
    const user = userData[id];
    for (let props in user) {
      if (user[props] === queryParam) {
        return user;
      }
    }
  }
  return null;
};
const findUserByEmail = function(queryParam, database) {
  for (const id in database) {
    if (database[id].email === queryParam) {
      return database[id];
    }
  }
  return null;
};

const findUserById = function (queryParam, database) {
  for(const id in database){
    if (database[id].id === queryParam){
      return database[id]
    }
  }
  return null
}

module.exports = {
  generateRandomString,
  findUserByProp,
  findUserByEmail,
  findUserById
};