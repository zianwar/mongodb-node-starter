
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'demo-db';
const testCol = 'test-col';

let client = new MongoClient(url, { useUnifiedTopology: true });

client.connect().then(() => {
  console.log('Connected correctly to server');
  const db = client.db(dbName);
})
.catch(err => {
  console.log('Error:', err);
})
.finally(() => {
  console.log("Client connection closed");
  client.close();
});