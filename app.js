const express = require("express");
const app = express();
app.use("/", express.static(__dirname + "/public"));
app.listen(8080, () => {
  console.log(`Main server running at http://localhost:8080/`);
});