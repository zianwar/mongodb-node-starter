const MongoClient = require('mongodb').MongoClient;
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
  // Insert a single document
  return col.insertOne({
    country: 'Morocco',
    capital: 'Rabat',
    continent: 'Africa'
  })
  .then(result => {
    assert.equal(1, result.insertedCount);
  });
})
.then(() => {
  // Insert multiple documents
  return col.insertMany([
    { country: 'France', capital: 'Paris', continent: 'Europe' },
    { country: 'Russia', capital: 'Moscow', continent: 'Asia' },
    { country: 'Germany', capital: 'Berlin', continent: 'Europe' }
  ])
    .then(result => {
      assert.equal(3, result.insertedCount);
    });
})
.catch((err) => {
  console.log('Error:', err);
})
.finally(() => {
  console.log('Client connection closed');
  client.close();
});