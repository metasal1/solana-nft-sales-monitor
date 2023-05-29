
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default async function saveToMongo(db, table, data) {
    try {
        await client.connect();
        const req = await client.db(db).collection(table).insertOne(data)
        console.log(req.acknowledged, req.insertedId, new Date())
    } finally {
        // await client.close();
    }
}
// saveToMongo({ name: 'John', age: 25 });