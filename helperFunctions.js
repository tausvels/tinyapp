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

const findUserById = function(queryParam, database) {
  for (const id in database) {
    if (database[id].id === queryParam) {
      return database[id];
    }
  }
  return null;
};

const sanitizeURL = function(url) {
  const temp = url;
  let output;
  let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  let regex = new RegExp(expression);

  if (!temp.match(regex)) {
    output = "https://" + temp;
  } else {
    output = temp;
  }
  return output;
};

const createDate = function() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  return today = `${mm}/${dd}/${yyyy}`;
};

const createTime = function() {
  let time = new Date();
  const hh = time.getHours();
  const mm = time.getMinutes();
  return time = `${hh}:${mm}`;
};
//console.log(createDate()); console.log(createTime());
module.exports = {
  generateRandomString,
  findUserByProp, // <-- Not Using this function but very helpful
  findUserByEmail,
  findUserById,
  sanitizeURL,
  createDate,
  createTime
};