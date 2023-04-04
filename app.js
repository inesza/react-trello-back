require("./config/dbConfig")

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")

const indexRouter = require('./routes/index');

const app = express();

app.set("trust proxy", 1);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/lists', require('./routes/lists.routes'))
app.use('/cards', require('./routes/cards.routes'))
app.use('/checklists', require('./routes/checklists.routes'))

require("./error-handling/index")(app);

module.exports = app;
