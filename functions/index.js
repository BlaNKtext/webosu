const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const url = require("url")
const app = express();
app.use("/", express.static(__dirname + "/public"));
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
  res.end("");
});
app.get("/get",(req, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify(a));
});
exports.app = functions.https.onRequest(app);