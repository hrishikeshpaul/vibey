'use strict';

require('dotenv').config();
require('./db/mongo/config')();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const tagRouter = require('./routes/tag');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.NODE_ENV === 'production' ? '' : process.env.DEV_URL,
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/tag', tagRouter);

module.exports = app;
