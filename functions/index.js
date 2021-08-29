const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors({ origin: true }));

app.get("/post",(req, res) => {
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