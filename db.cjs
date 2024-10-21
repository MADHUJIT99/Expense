const {MongoClient} = require('mongodb')

let db
function connectToDb(startServer) {
    MongoClient.connect('mongodb+srv://dev:06-Aug-03@cluster0.irkbgse.mongodb.net/').then(function(client) {
        db = client.db()
        return startServer()
    }).catch(function(error) {
        return startServer(error)
    })
}

function getDb() {
    return db
}

module.exports = {connectToDb, getDb}
// mongodb://localhost:27017
// mongodb+srv://dev:06-Aug-03@cluster0.irkbgse.mongodb.net/