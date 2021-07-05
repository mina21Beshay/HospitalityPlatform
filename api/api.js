exports.setApp = function (app, db_client) {

// Login endpoint
app.post("/api/account/login", async (req, res, next) => {
    // grab login and password from request
    const {username, password} = req.body
    const db = db_client.db();
    // Once createAccount has been implemented, we should instead search for
    //      only the login and verify the password with bcrypt.
    const results = await
        db.collection('Accounts').find({Login:username, Password:password}).toArray();
    if (results.length > 0) {
        // It's generally considered best practice to use let instead of var.
        // var has some oddities; let is considered more stable.
        let acc = results[0].AccountType;
        let id = results[0].UserID;
        let fn = results[0].FirstName;
        let ln = results[0].LastName;
        let ret = { UserID:id, AccountType:acc, FirstName:fn, LastName:ln, error:''}
        // Additionally, this endpoint is just supposed to return a JWT, not user data.
        return res.status(200).json(ret);
    }
    else
        res.status(403).send("Invalid Credentials.");
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
