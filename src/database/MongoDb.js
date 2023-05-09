const MongoClient = require('mongodb').MongoClient;

let db;

const loadDB = async () => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/Client', {
            useUnifiedTopology: true
        });

        db = client.db('Client');
    } catch (err) {
        console.log("error: ", err);
    }
    return db;
};

module.exports = loadDB;