console.clear();
const express = require("express");
const bodyParser = require("body-parser");

const port = 8080;
const server = express();

server.set("view engine", "ejs"); //Setting up the server view engine to use ejs.
server.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
// ------- GET REQUESTS ----------------
server.get("/urls.json", (req, res) => {
  //res.send(`<h1>Server says Hi! from port: ${port}</h1>`);
  res.json(urlDatabase);
});
server.get("/urls", (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});
server.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
server.get("/urls/:shortURL", (req, res) => {
  const templateVars = {shortURL: req.params.shortURL, longURL:urlDatabase[req.params.shortURL]};
  res.render("urls_show", templateVars);
});
server.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});
//----- POST REQUESTS ------////
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
    longCode: longURL
  };
  res.render(`urls_edit`, templateVars);
});
// FOR EDIT POST REQUEST
server.post(`/urls/:shortURL`, (req, res) => {
  const editedURL = {
    shortURL: req.body.shortURL,
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