const express = require("express");
const app = express();
const port = 80;
const router = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello WeGreen!");
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
