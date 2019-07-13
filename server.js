const express = require('express');
const session = require('express-session');

const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '123456789'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('express server is opened on port 3000.');
});