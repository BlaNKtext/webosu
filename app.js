const express = require("express");
const app = express();
app.listen(8080, () => {
  console.log(`Main server running at http://localhost:8080/`);
});