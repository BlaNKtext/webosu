const express = require("express");
const app = express();
app.listen(5000, () => {
  console.log(`Main server running at http://localhost:5000/`);
});