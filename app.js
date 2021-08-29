const express = require("express");
const app = express();
const http = require('http');
const hostname = '127.0.0.1';
const port = 8080;
const postport = 3000;
const getport = 3001;
app.use("/", express.static(__dirname + "/public"));
var a = [];
const postserver = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end("");
});
const getserver = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(a));
});
postserver.listen(postport, hostname, () => {
  console.log(`Post server running at http://${hostname}:${postport}/`);
});
getserver.listen(getport, hostname, () => {
  console.log(`Get server running at http://${hostname}:${getport}/`);
});
app.listen(port, () => {
  console.log(`Main server running at http://localhost:${port}/`);
});