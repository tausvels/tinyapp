console.clear();
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const bcrypt = require("bcrypt");

const userData = {};
const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" },
  Aswq7t: { longURL: "https://www.facebook.ca", userID: "ty75wq" },
  lk7b90: { longURL: "https://www.instagram.ca", userID: "c54eT1" }
};

const port = 8080;
const server = express();

server.set("view engine", "ejs"); //Setting up the server view engine to use ejs.
server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieSession({
  name: 'session',
  keys: ["bootcamp"],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// -----GET: REQUEST USER REGISTRATION ----- //
server.get("/register", (req, res) => {
  res.render(`user_registration`);
});
//-----POST: REQUESTS USER REGISTRATION ------ //
server.post(`/register`, (req, res) => {
  const id = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (email !== "" && password !== "") {
    if (!findUserByProp(email)) {
      userData[id] = {
        id: id,
        email: email,
        password: hashedPassword
      };
      req.session.user_id = id;
      res.redirect(`/urls`);
    } else {
      res.status(404)
        .send(`${res.statusCode}`);
    }
  } else {
    res.status(404)
      .send(`${res.statusCode}`);
  }
});

// -------GET: REQUEST LOGIN ---------- //
server.get(`/login`, (req, res) => {
  res.render(`login`, {error: null });
});
//-----POST: REQUESTS LOGIN------////
server.post(`/login`, (req, res) => {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;
  if (findUserByProp(enteredEmail) && bcrypt.compareSync(enteredPassword, (findUserByProp(enteredEmail)).password)) {
    const userId = (findUserByProp(enteredEmail)).id;
    //res.cookie(`user_id`, userId);
    req.session.user_id = userId;
    res.redirect(`/urls`);
  } else {
    res.status(403)
      .send(`${res.statusCode}`);
      //I really like the code below but it goes against what the instruction for the project is.
    //res.render('login', { error: `INCORRECT EMAIL OR PASSWORD!`})  ==> Returns on the login page for incorrect data
  }
});

//-----POST: REQUESTS LOGOUT------ //
server.post(`/logout`, (req, res) => {
  req.session = null;
  res.redirect(`/login`);
});

// ---GET: RENDERS (URLS_INDEX PAGE) ---- //
server.get("/urls", (req, res) => {
  const user_id = req.session.user_id;
  const userObj = findUserByProp(user_id);
  const templateVars = {urlDatabase: urlDatabase, userObj: userObj, user_id: user_id};
  res.render("urls_index", templateVars);
});

// ---GET: RENDERS (URLS_NEW) ON TRUTHY VALUE---- //
server.get("/urls/new", (req, res) => {
  const user_id = req.session.user_id;
  if (user_id) {
    const userObj = findUserByProp(user_id);
    const templateVars = {userObj: userObj};
    res.render("urls_new", templateVars);
  } else {
    res.redirect(`/login`);
  }
});

// ---GET: RENDERS (URLS_SHOW) ON TRUTHY VALUE --- //
server.get("/urls/:shortURL", (req, res) => {
  const user_id = req.session.user_id;
  if (user_id) {
    const shortURL = req.params.shortURL;
    const longURL = urlDatabase[shortURL].longURL;
    const userObj = findUserByProp(user_id);
    const templateVars = {shortURL: shortURL, longURL:longURL, userObj: userObj};
    res.render("urls_show", templateVars);
  } else {
    res.redirect(`/login`);
  }
});

// ---GET: REQUEST TO SEND PUBLIC TO THE LONG-URL LINK HELD BY SHORT-URL --- //
server.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  console.log("short", shortURL);
  const longURL = urlDatabase[shortURL].longURL;
  console.log("long", longURL);
  console.log("before redirect");
  res.redirect(longURL);
});

//---POST: REDIRECT AFTER CREATE NEW TINY URL ---- ///
server.post(`/urls`, (req, res) => {
  const longURL = "http://" + req.body.longURL;
  const user_id = req.session.user_id; //req.cookies["user_id"];
  //console.log("ONLY LONG URL ==>",longURL);
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = {
    longURL: longURL,
    userID: user_id
  };
  res.redirect(`/urls/${shortURL}`);
});

//-----GET: EDIT GET REQUEST ----- //
server.get(`/urls/edit/:shortURL`, (req, res) => {
  const user_id = req.session.user_id; // req.cookies["user_id"];
  if (user_id) {
    const shortURL = req.params.shortURL;
    const longURL = urlDatabase[shortURL].longURL;
    //const user_id = user_id; //req.cookies["user_id"];  <---- Redundant code
    const userObj = findUserByProp(user_id);
    const templateVars = {
      shortCode: shortURL,
      longCode: longURL,
      user_id: user_id,
      userObj: userObj
    };
    res.render(`urls_edit`, templateVars);
  } else {
    res.redirect(`/login`);
  }
});
//---POSR: FOR EDIT POST REQUEST ------- //
server.post(`/urls/:shortURL`, (req, res) => {
  const editedURL = {
    shortURL: req.params.shortURL,
    longUrl: req.body.longURL
  };
  urlDatabase[editedURL.shortURL].longURL = "https://" + editedURL.longUrl;
  console.log("AFTER EDIT", urlDatabase);
  res.redirect("/urls/");
});

//----POST: FOR DELETE ---------- //
server.post(`/urls/:shortURL/delete`, (req, res) => {
  const user_id = req.session.user_id; // req.cookies["user_id"];
  if (user_id) {
    let shortCode = req.params.shortURL;
    delete urlDatabase[shortCode];
    res.redirect(`/urls`);
  } else {
    res.redirect(`/login`);
  }
});

// --------- SERVER LISTEINING ----------- //
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