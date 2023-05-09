const loadDB = require('./MongoDb');

var ObjectId = require('mongodb').ObjectID;


async function setDatabase(objDatabase) {
    try {
        const db = await loadDB();
        let setDatabase = await db.collection('users').insertOne(objDatabase);

        return setDatabase.ops;
    } catch (error) {
        return false;
    }
}


async function updateDatabase(objQuery, objDatabase) {
    try {
        const db = await loadDB();
        await db.collection("users").updateOne(objQuery, {
            $set: objDatabase
        }, {
            upsert: true
        });
    } catch (error) {
        return false;
    }

    return true;
}

async function getDatabase(obj) {
    const db = await loadDB();
    let users;

    if (obj._id) {
        try {
            users = await db.collection("users").find({
                "_id": new ObjectId(obj._id)
            }).toArray();
        } catch (error) {
            users = false;
        }

    } else {
        users = await db.collection("users").find(obj).toArray();
    }

    if (users && users[0] && users[0].email) return users[0];
    else return false;
}

module.exports = {
    setDatabase: setDatabase,
    getDatabase: getDatabase,
    updateDatabase: updateDatabase
}