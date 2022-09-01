require('dotenv').config();

const express = require('express');
const session = require('express-session');

const router = require('./app/router');

const initLocalsMiddleware = require('./app/middlewares/initLocals');

const PORT = process.env.PORT || 5000;


const app = express();

app.use(express.static('integration'));

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true
}));

app.use(initLocalsMiddleware);

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
