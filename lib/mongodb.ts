import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

const cache =
  global.mongooseCache ||
  (global.mongooseCache = { conn: null, promise: null });

async function connectToDatabase() {
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(process.env.MONGODB_URI!)
      .then((mongooseInstance) => mongooseInstance);
  }
  cache.conn = await cache.promise;
  return cache.conn;
}

export default connectToDatabase;
