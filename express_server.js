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
  const templateVars = {shortURL: req.params.shortURL, longURL:"http://www.lighthouselabs.ca"};
  res.render("urls_show", templateVars);
});



server.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});