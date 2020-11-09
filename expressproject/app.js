var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Post = require('../expressproject/model/post');
const Notify = require('../expressproject/model/notify');
const checkAuth = require('./middleware/check-auth')
var app = express();

var bodyParser = require('body-parser');
const { error } = require('console');

// EvnF8OYFQewh5ovy
mongoose.connect("mongodb+srv://ana:rxzn1nCnntODy7xp@cluster0.hl9eq.mongodb.net/core?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('connected to Database')
    })
    .catch((err) => {
        console.log(err)
    })
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ limit: '5mb' }));

app.options('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Expires");
    res.sendStatus(200);
    next();
});

app.use('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Controll-Allow-Headers", "GET ,POST , PATCH , DELETE , OPTIONS");
    next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist/express')));

app.get(['/home', '/posts', '/', '/login', '/signup', '/home/*', '/posts/*'], function(req, res) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,token,Origin,X-Origin, Authorization');
    res.sendFile('index.html', { root: __dirname + '/public/dist/express' });
});

app.use('/', indexRouter);
app.use('/users/', usersRouter);

app.post("/api/postData", checkAuth, (req, res, next) => {
    const post = new Post({
        userName: req.body.userName,
        userCountry: req.body.userCountry,
        userModeOfPay: req.body.userModeOfPay,
        creator: req.userData.userId,
        creatorName: req.userData.email
    });
    post.save();
    res.status(201).json({
        message: post,
    })
});

app.post("/api/notifyData", checkAuth, (req, res, next) => {
    const post = new Notify({
        message: req.body.message,
        creator: req.userData.userId,
        creatorName: req.userData.email
    });
    post.save();
    res.status(201).json({
        message: post,
    })
});

app.get("/api/getData", (request, response) => {
        const pageSize = +request.query.pagesize;
        const currentPage = +request.query.page;
        const postQuery = Post.find();
        if (pageSize && currentPage) {
            postQuery.skip(pageSize * (currentPage - 1))
                .limit(pageSize);
            console.log(pageSize)
        }
        postQuery.then(documents => {

            response.status(201).json({
                message: documents,
            })
        });
    }),

    app.get("/api/getNotify", (request, response) => {
        const postQuery = Notify.find();
        postQuery.then(documents => {

            response.status(201).json({
                message: documents,
            })
        });
    }),

    app.delete("/api/deleteData/:id", checkAuth, (req, res, next) => {
        Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: 'post deleted' })
            } else
                res.status(401).json({ message: 'Un Authorised' })
        })

    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;