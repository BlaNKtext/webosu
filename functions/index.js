const express = require("express");
const app = express();
const url = require("url");
const port = 8989;
const cors = require("cors");
var a = [];
app.use(cors({ origin: true }));
app.get("/post",(req, res) => {
  var q = url.parse(req.url, true).query;
  if (q.title || q.sid) {
    a.push(q);
  }
  if (a.length > 16) {
    a.shift();
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end("");
});
app.get("/get",(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(a));
});
/*
app.listen(port, () => {
  console.log("Listening on http://127.0.0.1:8989")  
})
*/