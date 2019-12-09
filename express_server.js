console.clear();
const express = require ("express");

const port = 8080;
const server = express();

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

server.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
})