const fs = require('fs');
const { google } = require('googleapis');

const listAuth = require('../auth/listAuth');

function listFiles(req, res, auth) {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err, result) => {
        if (err) {
            return console.error('The API returned an error: ' + err);
        }
        const files = result.data.files;
        if (files.length) {
            res.render('index.ejs', {listFiles: files});
        } 
        else {
            console.log('No files found.');
        }
    });
}

module.exports = (req, res) => {
    fs.readFile('credentials.json', (err, content) => {
        if (err) {
            return console.error('Error loading client secret file:', err);
        }
        listAuth.authorize(JSON.parse(content), listFiles, req, res);
    });
}