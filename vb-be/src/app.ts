'use strict';

require('dotenv').config();
require('./db/mongo/config')();

import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const tagRouter = require('./routes/tag');
const playlistRouter = require('./routes/playlist');

// import { handleError } from 'lib/errors';
import { handleError } from './lib/errors';

const app = express();

app.use(
 cors({
  credentials: true,
  origin: process.env.NODE_ENV === 'production' ? '' : process.env.DEV_URL,
 })
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
app.use('/api/playlist', playlistRouter);

app.use((err, _, res) => {
 handleError(err, res);
});

module.exports = app;
