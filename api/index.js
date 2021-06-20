// Init
var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

var path = require('path');
app.use(express.json())
app.listen(port);

// const request = require("request");
const async = require("async");

// Note: make sure you authenticate correctly!
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://hosp_usr:BSSQagv0UxI8lgCl@hospitality.sovk0.mongodb.net/users?retryWrites=true&w=majority";
// const db_client = new MongoClient(uri, { useNewUrlParser: true });

console.log(`[HospitalityPlatform] Server running on port ${port}`);

// Web server stuff.
app.all("/", (req, res) => {
    let options = {
        root: path.join(__dirname, 'static'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.send("<h1>Hello COP4331</h1>");
})


app.all("/static/:file", (req, res) => {
    let options = {
        root: path.join(__dirname, 'static'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.sendFile(req.params.file, options);
})
