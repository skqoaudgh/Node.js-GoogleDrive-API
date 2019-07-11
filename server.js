const express = require('express');

const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('express server is opened on port 3000.');
});