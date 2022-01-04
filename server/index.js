const express = require("express");
const app = express();
const port = 80;
const router = require("./routes");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello WeGreen!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
