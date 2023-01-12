const express = require("express");
const app = express();
const url = require("url");
var a = [];
app.get("/post",(req, res) => {
  var q = url.parse(req.url, true).query;
  if (q.title || q.sid) {
    a.push(q);
  }
  if (a.length > 16) {
    a.shift();
  }
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end("");
});
app.get("/get",(req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(JSON.stringify(a));
});
app.get("/", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end("");
});

module.exports = app;