
const MongoClient = require('mongodb').MongoClient;
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
  // Update a single document
  return col.updateOne({ country: 'Morocco' }, { $set: { currency: 'MAD' } })
    .then(result => {
      assert.equal(1, result.matchedCount);
      assert.equal(1, result.modifiedCount);
    });
})
.then(() => {
  // Update multiple documents
  return col.updateMany({ continent: 'Europe' }, { $set: { curency: 'EUR' } })
    .then(result => {
      assert.equal(1, result.matchedCount);
      assert.equal(1, result.modifiedCount);
    });
})
.then(() => {
  // Upsert a single document
  return col.updateOne({ country: 'Russia' }, { $set: { currency: 'RUB' } }, { upsert: true })
    .then(result => {
      assert.equal(0, result.matchedCount);
      assert.equal(1, result.upsertedCount);
    });
})
.catch(err => {
  console.log('err:', err);
})
.finally(() => {
  console.log("Client connection closed");
  client.close();
})