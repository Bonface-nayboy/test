import { MongoClient } from 'mongodb';

// Fetch the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1); // Exit the process if the environment variable is missing
}

// Initialize MongoClient
const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to prevent multiple connections
    if (!(global as any)._mongoClientPromise) {
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    clientPromise = client.connect();
}

export default clientPromise;
