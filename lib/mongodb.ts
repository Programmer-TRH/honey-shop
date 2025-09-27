import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (uri)
  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

const options = {};

let cachedClient = null;
let cachedPromise = null;

export async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  if (!cachedPromise) {
    const client = new MongoClient(uri, options);
    cachedPromise = client.connect();
  }
  cachedClient = await cachedPromise;
  return cachedClient;
}
