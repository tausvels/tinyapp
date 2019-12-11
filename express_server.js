console.clear();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');


const userData = {};
const port = 8080;
const server = express();

server.set("view engine", "ejs"); //Setting up the server view engine to use ejs.
server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieParser());

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
// ------- GET REQUESTS ----------------
// ------- GET REQUEST USER REGISTRATION -------
server.get("/register", (req, res) => {
  res.render(`user_registration`);
})
// ------- GET REQUEST USER LOGIN -------------
server.get(`/login`, (req, res) => {
  res.render(`login`, {error: null });
})
server.get("/urls", (req, res) => {
  //const username = req.cookies["username"];
  const user_id = req.cookies["user_id"];
  const userObj = findUserByProp(user_id);
  console.log(userObj);
  const templateVars = {urls: urlDatabase, userObj: userObj};
  console.log(userObj);
  res.render("urls_index", templateVars);
});
server.get("/urls/new", (req, res) => {
  const user_id = req.cookies["user_id"];
  const userObj = findUserByProp(user_id);
  //const username = req.cookies["username"];
  const templateVars = {userObj: userObj};
  res.render("urls_new", templateVars);
});
server.get("/urls/:shortURL", (req, res) => {
  const user_id = req.cookies["user_id"];
  const userObj = findUserByProp(user_id);
  //const username = req.cookies["username"];
  const templateVars = {shortURL: req.params.shortURL, longURL:urlDatabase[req.params.shortURL], userObj: userObj};
  res.render("urls_show", templateVars);
});
server.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});
//----- POST REQUESTS REGISTER------//
server.post(`/register`, (req, res) => {
  const id = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  if (email !== "" && password !== ""){
    if (!findUserByProp(email)){ // if returns false/null
      userData[id] = {
        id: id,
        email: email,
        password: password
      }
      res.cookie(`user_id`, id);
      console.log(userData);
      res.redirect(`/urls`);
    } else {
      res.status(404)
      .send(`${res.statusCode}`)
    }
  } else {
    res.status(404)
    .send(`${res.statusCode}`)
  }
});
//----- POST REQUESTS LOGIN------////
server.post(`/login`, (req, res) => {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;
  console.log(enteredEmail);
  if(findUserByProp(enteredEmail) && (findUserByProp(enteredEmail)).password === enteredPassword){
      const userId = (findUserByProp(enteredEmail)).id;
      res.cookie(`user_id`, userId);
      res.redirect(`/urls`);
  }else{
    res.status(403)
    .send(`${res.statusCode}`);
    //res.render('login', { error: `INCORRECT EMAIL OR PASSWORD!`})  ==> Returns on the login page for incorrect data
  }
})
//----- POST REQUESTS LOGOUT------////
server.post(`/logout`, (req, res) => {
  res.clearCookie(`user_id`);
  res.redirect(`/urls`);
})
//----- POST REDIRECT AFTER CREATE NEW TINY URL ---- ///
server.post(`/urls`, (req, res) => {
  const longURL = "http://" + req.body.longURL;
  //console.log("ONLY LONG URL ==>",longURL);
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;
  res.redirect(`/urls/${shortURL}`);
});
// FOR EDIT GET REQUEST//
server.get(`/urls/edit/:shortURL`, (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  const user_id = req.cookies["user_id"];
  const userObj = findUserByProp(user_id);
  const templateVars = {
    shortCode: shortURL,
    longCode: longURL,
    user_id: req.cookies[`user_id`],
    userObj: userObj
  };
  res.render(`urls_edit`, templateVars);
});
// FOR EDIT POST REQUEST
server.post(`/urls/:shortURL`, (req, res) => {
  const editedURL = {
    shortURL: req.params.shortURL,
    longUrl: req.body.longURL
  };
    urlDatabase[editedURL.shortURL] = editedURL.longUrl;
    res.redirect("/urls/");
});
// FOR DELETE //
server.post(`/urls/:shortURL/delete`, (req, res) => {
  let shortCode = req.params.shortURL;
  delete urlDatabase[shortCode];
  res.redirect(`/urls`);
});

server.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});

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

const findUserByProp = function (queryParam) {
  for(const id in userData){
    const user = userData[id];
    for (let props in user) {
      if(user[props] === queryParam){
        return user;
      }
    }
  }
  return null
}
