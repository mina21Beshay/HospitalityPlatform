exports.setApp = function (app, db_client) {

// Login endpoint
app.post("/api/login", async (req, res, next) => {
    // grab login and password from request 
    const {username, password} = req.body
    const db = db_client.db();
    const results = await 
        db.collection('Accounts').find({Login:username, Password:password}).toArray()
    if (results.length > 0) {
        var acc = results[0].AccountType
        var id = results[0].UserID
        var fn = results[0].FirstName
        var ln = results[0].LastName
        var ret = { UserID:id, AccountType:acc, FirstName:fn, LastName:ln, error:''}
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

}