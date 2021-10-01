const functions = require("firebase-functions");
const express = require("express");
const app = express();
const url = require("url");
const cors = require("cors")
app.use(cors({ origin: true }));
var a = [];
app.get("/post",(req, res) => {
  var q = url.parse(req.url, true).query;
  var ip = req.headers["x-real-ip"];
  if (ip) {
    ip = ip.split(".");
    ip[0] = "**";
    if (ip.length > 3) {
      ip[3] = "**";
    }
    ip = ip.join(".");
  } else {
    ip = "";
  }
  q.ip = ip;
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
exports.app = functions.https.onRequest(app);
