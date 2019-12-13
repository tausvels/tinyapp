const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  },
  "SYRsGE" : {
    id: "SYRsGE",
    email: "whatever@email.com",
    password: "something"
  }
}
const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" },
  Aswq7t: { longURL: "https://www.facebook.ca", userID: "ty75wq" },
  lk7b90: { longURL: "https://www.instagram.ca", userID: "c54eT1" }
};
const helperFunctions = require("./helperFunctions");
const { findUserByEmail } = require("./helperFunctions");

//const output = helperFunctions.findUserByEmail("whatever@email.com", users); console.log(output)
//console.log(findUserByEmail("whatever@email.com", users));





// const urlsForUser = function (id) {
//   for (const shortCode in urlDatabase) {
//     const shortDatabase = urlDatabase[shortCode];
//     if (urlDatabase[shortCode].userID === id) {
//       console.log("Short Code ==> ",shortCode)
//       console.log("Long Code ==> ", urlDatabase[shortCode].longURL)
//       console.log("UserID ==> ", urlDatabase[shortCode].userID);
//     }
//     //console.log(urlDatabase[shortCode].userID)
//   }
// }
// urlsForUser("aJ48lW");

const createTime = function () {
  let time = new Date();
  const hh = time.getHours();
  let mm = time.getMinutes();
  if(mm < 10){
    mm = "0"+mm;
  }
  time = `${hh}:${mm}`;
  return time
}
createTime()
const createDate = function () {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  return today = `${mm}/${dd}/${yyyy}`;
}
console.log(createDate())


const sanitizeURL = function (url){
  const temp = url;
  let output;
  let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  let regex = new RegExp(expression);

  if (!temp.match(regex)){
    output = "https://www."+temp;
  } else {
    output = temp;
  }
  return output;
}
