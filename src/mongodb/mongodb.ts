import * as mongoDB from "mongodb";

// Connection URI
const uri =
  "mongodb://localhost:27017/didactic_spoon";
// Create a new MongoClient
const client = new mongoDB.MongoClient(uri);

export async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
 

 