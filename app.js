const express = require("express");
const app = express();
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
app.listen(8080, () => {
  console.log(`Main server running at http://localhost:8080/`);
});