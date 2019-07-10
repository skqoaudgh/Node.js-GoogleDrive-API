const express = require('express');
const fs = require('fs');
const { google } = require('googleapis');
const listAuth = require('./auth/listAuth');
const app = express();
  
fs.readFile('credentials.json', (err, content) => {
    if (err) {
        return console.error('Error loading client secret file:', err);
    }
    listAuth.authorize(JSON.parse(content), listFiles);
});

function listFiles(auth) {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
        console.log('Files:');
        files.map((file) => {
            console.log(`${file.name} (${file.id})`);
        });
        } else {
        console.log('No files found.');
        }
    });
}

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', (req, res, next) => {
    res.render('index.ejs');
    request('https://www.googleapis.com/drive/v3/files', (error, response, body) => {
        if(error) {
            console.error(error);
        }
        else {
            console.log(response.body.name);
        }
    });
});

app.listen(3000, () => {
    console.log('express server is opened on port 3000.');
});