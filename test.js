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

const findUserByEmail = function (queryParam, database) {
  for(const id in database){
    if (database[id].email === queryParam){
      return database[id]
    }
  }
  return null
}
const findUserById = function (queryParam, database) {
  for(const id in database){
    if (database[id].id === queryParam){
      return database[id]
    }
  }
  return null
}
const queryParam = "user2@example.com", queryParam2 = "SYRsGE";
const output = (findUserByEmail(queryParam, users));
const output2 = findUserById(queryParam2, users);
//findUserByEmail(queryParam);
console.log(output.email);
console.log(output2)
const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" },
  Aswq7t: { longURL: "https://www.facebook.ca", userID: "ty75wq" },
  lk7b90: { longURL: "https://www.instagram.ca", userID: "c54eT1" }
};

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