const express = require('express');
const app = express();
const port = 80;
const router = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const scheduler = require('./controllers/mail/cron');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", ['https://wegreen.link']);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
  })
);

scheduler();
app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello WeGreen!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
