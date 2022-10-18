let express = require('express');
let indexRouter = require('./routes/index');
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow requests from Vue front end
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/', indexRouter);

module.exports = app;
