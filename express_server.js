console.clear();
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const bcrypt = require("bcrypt");
const helperFunctions = require("./helperFunctions");

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
  const user_id = req.session.user_id;
  const userObj = helperFunctions.findUserById(user_id, userData);
  const templateVars = {urlDatabase: urlDatabase, userObj: userObj, user_id: user_id};
  res.render(`user_registration`, templateVars);
});
//-----POST: REQUESTS USER REGISTRATION ------ //
server.post(`/register`, (req, res) => {
  const id = helperFunctions.generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (email !== "" && password !== "") {
    if (!helperFunctions.findUserByEmail(email)) {
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
  const user_id = req.session.user_id;
  const userObj = helperFunctions.findUserById(user_id, userData);
  const templateVars = {urlDatabase: urlDatabase, userObj: userObj, user_id: user_id, error: null};
  res.render(`login`, templateVars);
});
//-----POST: REQUESTS LOGIN------////
server.post(`/login`, (req, res) => {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;
  const user = helperFunctions.findUserByEmail(enteredEmail, userData);

  if (user && bcrypt.compareSync(enteredPassword, user.password)) {
    const userId = user.id;
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
  if (helperFunctions.findUserById(user_id, userData)) {
    const userObj = helperFunctions.findUserById(user_id, userData);
    const templateVars = {urlDatabase: urlDatabase, userObj: userObj, user_id: user_id};
    res.render("urls_index", templateVars);
  } else {
    res.redirect(`/login`);
  }
});

// ---GET: RENDERS (URLS_NEW) ON TRUTHY VALUE---- //
server.get("/urls/new", (req, res) => {
  const user_id = req.session.user_id;
  if (user_id) {
    const userObj = helperFunctions.findUserById(user_id, userData);
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
    if (urlDatabase[shortURL]) {
      const longURL = urlDatabase[shortURL].longURL;
      const userObj = helperFunctions.findUserById(user_id, userData);
      const templateVars = {shortURL: shortURL, longURL:longURL, userObj: userObj};
      res.render("urls_show", templateVars);
    } else {
      res.status(403)
        .send(`${res.statusCode}`);
    }
  } else {
    res.redirect(`/login`);
  }
});

// ---GET: REQUEST TO SEND PUBLIC TO THE LONG-URL LINK HELD BY SHORT-URL --- //
server.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL].longURL;
  res.redirect(longURL);
});

//---POST: REDIRECT AFTER CREATE NEW TINY URL ---- ///
server.post(`/urls`, (req, res) => {
  const longURL = helperFunctions.sanitizeURL(req.body.longURL);
  const user_id = req.session.user_id;
  const shortURL = helperFunctions.generateRandomString();
  const date = helperFunctions.createDate();
  urlDatabase[shortURL] = {
    longURL: longURL,
    userID: user_id,
    dateCreated: date
  };
  res.redirect(`/urls/${shortURL}`);
});

//-----GET: FOR EDIT GET REQUEST ----- //
server.get(`/urls/edit/:shortURL`, (req, res) => {
  const user_id = req.session.user_id;
  if (user_id) {
    const shortURL = req.params.shortURL;
    if (urlDatabase[shortURL]) {
      const longURL = urlDatabase[shortURL].longURL;
      const userObj = helperFunctions.findUserById(user_id, userData);
      const templateVars = {
        shortCode: shortURL,
        longCode: longURL,
        user_id: user_id,
        userObj: userObj
      };
      res.render(`urls_edit`, templateVars);
    } else {
      res.status(403)
        .send(`${res.statusCode}`);
    }
  } else {
    res.redirect(`/login`);
  }
});
//---POST: FOR EDIT POST REQUEST ------- //
server.post(`/urls/:shortURL`, (req, res) => {
  const editedURL = {
    shortURL: req.params.shortURL,
    longUrl: req.body.longURL
  };
  const date = helperFunctions.createDate();
  urlDatabase[editedURL.shortURL].longURL = "https://" + editedURL.longUrl;
  urlDatabase[editedURL.shortURL].longURL = helperFunctions.sanitizeURL(editedURL.longUrl);
  urlDatabase[editedURL.shortURL].dateCreated = date;
  res.redirect("/urls/");
});

//----POST: FOR DELETE ---------- //
server.post(`/urls/:shortURL/delete`, (req, res) => {
  const user_id = req.session.user_id;
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