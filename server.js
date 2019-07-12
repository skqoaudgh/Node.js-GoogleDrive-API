const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('express server is opened on port 3000.');
});