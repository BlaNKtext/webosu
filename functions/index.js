const functions = require("firebase-functions");
const express = require("express");
const app = express();
const url = require("url");
const cors = require("cors")
// Main Routes
app.use("/", express.static(__dirname + "/public"));
app.use("/404", express.static(__dirname + "/public/404.html"));
app.use("/new", express.static(__dirname + "/public/new.html"));
app.use("/hot", express.static(__dirname + "/public/hot.html"));
app.use("/faq", express.static(__dirname + "/public/faq.html"));
app.use("/home", express.static(__dirname + "/public/index.html"));
app.use("/browse", express.static(__dirname + "/public/browse.html"));
app.use("/search", express.static(__dirname + "/public/search.html"));
app.use("/favorites", express.static(__dirname + "/public/local.html"));
app.use("/options", express.static(__dirname + "/public/settings.html"));
// Testing Routes
app.use("/testing", express.static(__dirname + "/public/testing/index.html"));
app.use("/testing/404", express.static(__dirname + "/public/testing/404.html"));
app.use("/testing/new", express.static(__dirname + "/public/testing/new.html"));
app.use("/testing/hot", express.static(__dirname + "/public/testing/hot.html"));
app.use("/testing/faq", express.static(__dirname + "/public/testing/faq.html"));
app.use("/testing/home", express.static(__dirname + "/public/testing/index.html"));
app.use("/testing/browse", express.static(__dirname + "/public/testing/browse.html"));
app.use("/testing/search", express.static(__dirname + "/public/testing/search.html"));
app.use("/testing/favorites", express.static(__dirname + "/public/testing/local.html"));
app.use("/testing/options", express.static(__dirname + "/public/testing/settings.html"));
// Plugin Routes
app.use("/", express.static(__dirname + "/public/plugin/index.html"));
app.use("/404", express.static(__dirname + "/public/plugin/404.html"));
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