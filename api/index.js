// Init
var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;
var path = require('path');
app.use(express.json())
app.listen(port);

// const request = require("request");
const async = require("async");
//const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()

// Note: make sure you authenticate correctly!
    const MongoClient = require('mongodb').MongoClient;
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qaihg.mongodb.net/HotelManagement?retryWrites=true&w=majority`;
    const db_client = new MongoClient(uri, { useNewUrlParser: true });
    db_client.connect()
 
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

// Login endpoint
app.post("/api/login", async (req, res, next) => {
    // grab login and password from request 
    const {username, password} = req.body
    const db = db_client.db();
    const results = await 
        db.collection('Accounts').find({Login:username, Password:password}).toArray()
    if (results.length > 0) {
        var id = results[0].UserID
        var fn = results[0].FirstName
        var ln = results[0].LastName
        var ret = { user_id:id, first_name:fn, last_name:ln, error:''}
        return res.status(200).json(ret)
    }
    else
        res.status(403).send("Invalid Credentials.")
    
})

// bcrypt hash password function for POST/api/createAcc
// const hashPassword = async (password, saltRounds = 10) => {
//     try {
//         const salt = await bcrypt.genSalt(saltRounds)
//         // hash password
//         return await bcrypt.hash(password, salt)
//     } catch (err) {
//         console.log(err)
//     }
//     // return null if error
//     return null 
// }