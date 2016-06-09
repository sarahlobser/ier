var express = require('express');
var app = express();
var cookie = require('cookie-parser');
var session = require('express-session');

var passportConfig = require('./config/passportConfig');

var handlebars = require('express-handlebars');
var port = process.env.PORT || 3000;
var bp = require('body-parser');

var secret;
if (process.env.SECRET) {
    secret = process.env.SECRET;
} else {
    secret = require('./credentials').secret;
}

app.use(bp.json());
app.use(bp.urlencoded({
    extended: false
}));

app.use(cookie(secret));

app.use(session({
    resave: false
    , saveUninitialized: false
    , secret: secret
    , key: 'user'
}));

app.set('views', 'app_server/views');
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars({
    defaultLayout: '../../app_server/views/layouts/main'
}));
app.set('view engine', 'handlebars');

app.use(passportConfig.initialize());
app.use(passportConfig.session());

var models = require('./app_api/models');

app.use('/', require('./app_server/routes/loginRoutes'));
app.use('/api/users', require('./app_api/routes/userRoutes'));
app.use('/users', require('./app_server/routes/userRoutes'));
app.use('/products', require('./app_server/routes/routes'));
app.use('/employees', require('./app_api/routes/employeeRoutes'));
//app.use('/profile', require('./app_server/routes/userRoutes'));
app.use('/cart', require('./app_server/routes/cartRoutes'));
app.use('/contact', require('./app_server/routes/contactRoutes'));
app.use('/answer', require('./app_server/routes/answerRoutes'));

app.use('/api/products', require('./app_api/routes/productRoutes'));

models.sequelize.sync()
    .then(function () {
        console.log('successfully synced db');
        app.listen(port, function () {
            console.log('listening on ' + port);
        });
    })
    .catch(function (err) {
        console.error(err);
    });
