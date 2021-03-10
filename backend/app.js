require('dotenv').config();
require('./db/mongo/config')();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const redisClient = require('./db/redis/config')();
const redisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth').app;

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'vss',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 360000 },
  store: new redisStore({ client: redisClient, ttl: 3600 }),
}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

module.exports = app;
