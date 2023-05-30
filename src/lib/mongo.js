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

export const saveToMongo = async (data, db, table) => {
    try {
        await client.connect();

        const { date, salesPrice, signature } = data;
        const { name: exchangeName } = data.exchange;
        const { name: nftName } = data.metadata.offChain;

        const item = { date: new Date(), saleDate: date.toLocaleString(), nftName, salesPrice, exchangeName, signature };

        const req = await client.db(db).collection(table).insertOne(item)
        console.log(req.acknowledged, req.insertedId, new Date())
    } finally {
        // await client.close();
    }
}
// saveToMongo({ name: 'John', age: 25 });