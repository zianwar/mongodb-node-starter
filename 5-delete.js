const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'demo-db';
const testCol = 'test-col';

let client = new MongoClient(url, { useUnifiedTopology: true });
let col = null;


client.connect().then(() => {
  console.log('Connected correctly to server');
  const db = client.db(dbName);
  col = db.collection(testCol);
})
.then(() => {
  // Delete a single document
  return col.deleteOne({ country: 'Morocco' })
    .then(result => {
      assert.equal(1, result.deletedCount);
    });
})
.then(() => {
  // Delete by id
  // return col.deleteOne({ _id: ObjectID('2222211112121') })
  //   .then(result => {
  //     assert.equal(1, result.deletedCount);
  //   });
})
.then(() => {
  // Delete multiple documents
  return col.deleteMany({ continent: 'Europe' })
    .then(result => {
      assert.equal(2, result.deletedCount);
    });
})
.catch(err => {
  console.log('Error:', err);
})
.finally(() => {
  console.log('Client connection closed');
  client.close();
})