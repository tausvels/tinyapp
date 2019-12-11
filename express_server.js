console.clear();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');


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
server.get("/user_registration", (req, res) => {
  res.render(`user_registration`);
})
server.get("/urls.json", (req, res) => {
  //res.send(`<h1>Server says Hi! from port: ${port}</h1>`);
  res.json(urlDatabase);
});
server.get("/urls", (req, res) => {
  const username = req.cookies["username"];
  const templateVars = {urls: urlDatabase, username: username};
  console.log(username);
  res.render("urls_index", templateVars);
});
server.get("/urls/new", (req, res) => {
  const username = req.cookies["username"];
  const templateVars = {username: username};
  res.render("urls_new", templateVars);
});
server.get("/urls/:shortURL", (req, res) => {
  const username = req.cookies["username"];
  const templateVars = {shortURL: req.params.shortURL, longURL:urlDatabase[req.params.shortURL], username: username};
  res.render("urls_show", templateVars);
});
server.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});
//----- POST REQUESTS LOGIN------////
server.post(`/login`, (req, res) => {
  const userName = req.body.username;
  console.log(userName);
  res.cookie(`username`, userName);
  res.redirect(`/urls`);
})
//----- POST REQUESTS LOGOUT------////
server.post(`/logout`, (req, res) => {
  res.clearCookie(`username`);
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
  const templateVars = {
    shortCode: shortURL,
    longCode: longURL,
    username: req.cookies[`username`]
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