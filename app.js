const {Resemble} = require('@resemble/node')
const {createWriteStream} = require("node:fs");
const {Server} = require("socket.io");
const setupStreamServer = require("./streamserver.js");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { createServer } = require('node:http');

let indexRouter = require('./routes/index');

const app = express();
const server = createServer(app);
const io = new Server(server);
setupStreamServer(io);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
