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

const findUserByEmail = function (queryParam) {
  for(const id in users){
    const user = users[id];
    for (let props in user) {
      if(user[props] === queryParam){
        return user;
      }
    }
  }
  return null
}
const queryParam = "SYRsGE";
const output = (findUserByEmail(queryParam));
console.log(output.email)