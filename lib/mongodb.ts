// lib/mongodb.ts
import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options: MongoClientOptions = {};

if (!uri) throw new Error('Missing MONGODB_URI in env');

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Prevent duplicate MongoClient in dev
  // @ts-ignore
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
