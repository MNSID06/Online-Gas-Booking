const mongoose = require('mongoose')
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'gas-booking'
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect')
    }
   
    const db = client.db(databaseName)
   
    // db.collection('admin').insertOne({
    //     name: 'naaz',
    //     age: 20
    // })

    mongoose.connect('mongodb://127.0.0.1:27017/gas-booking', {
    useNewUrlParser: true
})
})