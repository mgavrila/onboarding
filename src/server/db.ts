import { MongoClient } from "mongodb";

import { env } from "../env/server.mjs";

if (!env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = env.DATABASE_URL;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

const global = globalThis as unknown as {
  _mongoClientPromise: Promise<MongoClient> | null;
};

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

const getDb = async (clientPromise: Promise<MongoClient>) => {
  return clientPromise.then((client) => client.db("onboarding"));
};

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { clientPromise, getDb };
