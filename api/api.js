const jwt = require('jsonwebtoken');
const authn = require('./authn');

exports.setApp = function (app, db_client) {

// Account Endpoints
// Login 
app.post("/api/account/login", async (req, res, next) => {
    // grab login and password from request
    const {username, password} = req.body;
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
        // Actually, this endpoint should return a JWT, not information on the user. So let's generate that.
        // And note how we are embedding in both the username and the role. This makes things a bit easier later on.
        const token = jwt.sign({'username': username, 'role': acc.toLowerCase()}, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            // https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
            "token": "Bearer " + token
        });
    }
    else
        return res.status(401).json(errGen(401));
})

// Admin Endpoints
// List all Items from Inventory
app.get("/api/inventory", authn.isAuthorized, async (req, res, next) => {
    const db = db_client.db();
    const results = await
        db.collection('Inventory').find({}).toArray();
    let formatted = []
    for (let i = 0; i < results.length; i++) {
        formatted[i] = inventoryGen(results[i]);
    }
    return res.status(200).json(formatted);
})
// Add Item to Inventory 
app.post("/api/inventory", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
    // Admin guard: authn.isAdmin. Requires isAuthorized to be called FIRST; Order matters a lot here!
    // Can be replaced with isStaff to check if an endpoint is available for staff and admin (not guest).

    let {name, description, img, quantity} = req.body;
    if (!name) return res.status(403).json(errGen(403, 'Missing "name" field in request.'));
    if (!description) description = "";
    if (!img) img = "";
    if (!quantity) quantity = -1;

    // What will end up in the DB, sans item ID.
    const obj = {
        "Name": name,
        "Description": description,
        "IMG": img,
        "Quantity": quantity
    };

    const db = db_client.db();
    // Insert, format, and then return.
    db.collection('Inventory').insertOne(obj).then((out) => {
        const results = out.ops[0];
        return res.status(200).json(inventoryGen(results));
    }).catch((err) => {
        return res.status(500).json(errGen(500, err));
    });
})
// Delete Item from Inventory
app.delete("/api/inventory/:inventory_id", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
    let inventory_id = req.params.inventory_id;
    try {
        inventory_id = Number(inventory_id);
        if (isNaN(inventory_id))
            return res.status(400).json(errGen(400, "Invalid item ID."));
    } catch(err) {
        // If we can't cast a number
        return res.status(400, "Invalid item ID.");
    }
    db_client.db().collection('Inventory').deleteOne({Item_ID: inventory_id}).then((out) => {
        if (out.deletedCount === 0)
            return res.status(200).json(errGen(200, "No items deleted."));
        return res.status(200).json(errGen(200, "Item successfully deleted."));
    }).catch((err) => {
        return res.status(500).json(errGen(500, err));
    });
});
// 
app.patch("/api/inventory/:inventory_id", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
    // Get inventory ID and validate it is, indeed, a number.
    let inventory_id = req.params.inventory_id;
    try {
        inventory_id = Number(inventory_id);
        if (isNaN(inventory_id))
            return res.status(400).json(errGen(400, "Invalid item ID."));
    } catch(err) {
        // If we can't cast a number
        return res.status(400, "Invalid item ID.");
    }

    const {name, quantity, description, img} = req.body;
    let newObj = {}
    // Properties staff AND admin can edit.
    if (quantity) newObj.Quantity = quantity;
    // Properties ONLY admin can edit.
    if (req.user.role === "admin") {
        if (name) newObj.Name = name;
        if (description) newObj.Description = description;
        if (img) newObj.IMG = img;
    }

    db_client.db().collection('Inventory').findOneAndUpdate({Item_ID: inventory_id}, {$set: newObj})
        .then((out) => {
            return res.status(200).json(inventoryGen(out.value));
            })
        .catch((err) => {
            return res.status(500).json(errGen(500, err));
    });
});

// Guest Endpoints
// Get Current Room Information
app.get("/api/room/:room_id", authn.isAuthorized, async (req, res, next) => 
{  
    let room_id = req.params.room_id
    const db = db_client.db()
    const results = await 
        db.collection('Room').find({RoomID:room_id}).toArray()
    let formatted = []
    formatted[0] = roomGen(results[0])
    console.log(formatted[0].orders)
    return res.status(200).json(formatted)
})
    
// Orders an inventory item to a user's room
app.get("/api/inventory/:iventory_id")
// Get information on a specific inventory entry


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
