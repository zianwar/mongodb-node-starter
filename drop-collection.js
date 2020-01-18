const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'demo-db';
const testCol = 'test-col';

let client = new MongoClient(url, { useUnifiedTopology: true });

client.connect().then(() => {
  console.log('Connected correctly to server');
  const db = client.db(dbName);
  return db.dropCollection(testCol)
})
  .catch(err => {
    if (err.codeName === 'NamespaceNotFound') {
      return console.log(`Error: collection "${testCol}" not found`);
    }
    console.log('Error:', err);
  })
  .finally(() => {
    console.log("Client connection closed");
    client.close();
  });