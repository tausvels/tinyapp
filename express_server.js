console.clear();
const express = require ("express");

const port = 8080;
const server = express();
server.set("view engine", "ejs"); //Setting up the server view engine to use ejs.

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
  res.send(`a = ${a}`)
});
server.get("/fetch", (req, res) => {
  res.send(`a = ${a}`)
});
server.get("/urls", (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
})

server.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
})