const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'demo-db';
const testCol = 'test-col';

let client = new MongoClient(url, { useUnifiedTopology: true });
let col = null;


client.connect().then(() => {
  console.log("Connected correctly to server");
  const db = client.db(dbName);
  col = db.collection(testCol);
})
.then(() => {
  // Finds a single document
  return col.findOne({ country: 'Morocco' })
  .then(result => {
    console.log(result);
  });
})
.then(() => {
  // Finds a single document by id
  // return col.findOne({ _id: ObjectID('5e225520e6e0458704f9927d') })
  // .then((result) => {
  //   console.log('Result:', result);
  // });
})
.then(() => {
  // Get first two documents that match the query
  return col.find({ continent: 'Europe' }).limit(2).toArray()
  .then(result => {
    console.log('Result:', result);
  });
})
.catch((err) => {
  console.log('Error:', err);
})
.finally(() => {
  console.log('Client connection closed');
  client.close();
});