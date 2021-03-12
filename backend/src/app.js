require("dotenv").config();
require("./db/mongo/config")();

import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import session from "express-session";
import { redisClient, redisStore } from "./db/redis/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "vss",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 360000 },
    store: new redisStore({ client: redisClient, ttl: 3600 }),
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

module.exports = app;
