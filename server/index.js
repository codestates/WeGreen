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

app.use(
  cors({
    origin: 'https://wegreen.link',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH'],
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
