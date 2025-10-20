import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const options = {};

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, reuse the client connection across HMR reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
