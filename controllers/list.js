const fs = require('fs');
const { google } = require('googleapis');
const async = require('async');

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
        res.render('index.ejs', {listFiles: files});
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

function searchFile(req, res, auth) {
    const drive = google.drive({version: 'v3', auth});
    let pageToken = null;
    let files = [];
    async.doWhilst(function (callback) {
        drive.files.list({
            q: `fullText contains "${req.body.name}"`,
            fields: 'nextPageToken, files(id, name)',
            //spaces: 'drive',
            pageToken: pageToken
        }, function (err, result) {
            if (err) {
                console.error(err);
                callback(err)
            } 
            else {
                if(result.nextPageToken) {
                    pageToken = result.nextPageToken;
                }
                else {
                    files = files.concat(result.data.files);
                    res.render('index.ejs', {listFiles: files});
                    callback();
                }
            }
        });
    }, function () {
        return !!pageToken;
    }, function (err) {
        if (err) {
            console.error(err);
            res.redirect('index.ejs');
        } 
        else {
            res.redirect('index.ejs');
        }
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
    },
    searchFile: (req, res) => {
        fs.readFile('credentials.json', (err, content) => {
            if (err) {
                return console.error('Error loading client secret file:', err);
            }
            listAuth.authorize(JSON.parse(content), searchFile, req, res);
        });
    }
}