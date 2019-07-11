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

function downloadFile(req, res, auth) {
    const drive = google.drive({version: 'v3', auth});
    const fileId = req.params.id;
    const dest = fs.createWriteStream(req.params.name);
    drive.files.get({
        fileId: fileId,
        alt: 'media'
    }, {responseType: 'stream'},
    function(error, result) {
        result.data
        .on('end', function () {
            res.redirect('/');
        })
        .on('error', function (error) {
            console.error('Error during download', error);
        })
        .pipe(dest);
    });
}

module.exports = {
    listFile: (req, res) => {
        fs.readFile('credentials.json', (err, content) => {
            if (err) {
                return console.error('Error loading client secret file:', err);
            }
            listAuth.authorize(JSON.parse(content), listFiles, req, res);
        });
    },
    downloadFile: (req, res) => {
        fs.readFile('credentials.json', (err, content) => {
            if (err) {
                return console.error('Error loading client secret file:', err);
            }
            listAuth.authorize(JSON.parse(content), downloadFile, req, res);
        });
    }
}