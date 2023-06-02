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

        const { date, collection, salesPrice, signature } = data;
        const { name: exchangeName } = data.exchange;
        const { name: nftName } = data.metadata.offChain;

        const item = { date: (new Date().toLocaleString()), collection, saleDate: date.toLocaleString(), nftName, salesPrice, exchangeName, signature };

        const existingItem = await client.db(db).collection(table).findOne({ signature });
        if (existingItem) {
            console.log('Signature already exists. Skipping insertion.');
            return;
        }

        const req = await client.db(db).collection(table).insertOne(item);
        console.log(req.acknowledged, req.insertedId, new Date());
    } finally {
        // await client.close();
    }
}
