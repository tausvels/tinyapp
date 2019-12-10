console.clear();
const express = require ("express");
const bodyParser = require("body-parser");

const port = 8080;
const server = express();

server.set("view engine", "ejs"); //Setting up the server view engine to use ejs.
server.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

server.get("/urls.json", (req, res) => {
  //res.send(`<h1>Server says Hi! from port: ${port}</h1>`);
  res.json(urlDatabase);
});
server.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
server.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
});
server.get("/fetch", (req, res) => {
  res.send(`a = ${a}`)
});
server.get("/urls", (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});
server.get("/urls/new", (req, res) => {
  res.render("urls_new")
});
server.get("/urls/:shortURL", (req, res) => {
  const templateVars = {shortURL: req.params.shortURL, longURL:urlDatabase[req.params.shortURL]};
  res.render("urls_show", templateVars);
});
//----- POST REQUESTS ------////
server.post(`/urls`, (req, res) => {
  //console.log(`${req.body}`);
  const longURL = "http://www."+req.body.longURL;
  console.log("ONLY LONG URL ==>",longURL);
  const shortURL = generateRandomString();
  //console.log(shortURL);
  urlDatabase[shortURL] = longURL;
  console.log(urlDatabase)
  res.redirect(`/urls/${shortURL}`)
})

server.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});

function generateRandomString() {
  const char = ("abcdefghijklmnopqrstuvwxyz");
  const num = ("0123456789");
  const charsToGenerate = 2;
  let randStringArr = [];
  for (let i = 0; i < charsToGenerate; i++) {
    let randNumber = Math.floor(Math.random() * 26);
    let randChar = (char.split(""))[randNumber];
    randStringArr.push(randChar);
    randNumber = Math.floor(Math.random() * 26);
    let randCharCap = ((char.toUpperCase()).split(""))[randNumber];
    randStringArr.push(randCharCap);
    randNumber = Math.floor(Math.random() * 10);
    let randNum = (num.split(""))[randNumber];
    randStringArr.push(randNum);
  }
  return randStringArr.join("");
}