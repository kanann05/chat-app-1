import jwt from 'jsonwebtoken';
import { MongoClient } from "mongodb";
import SECRET_KEY from '../env';

export async function POST(req : Request) {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        let token = await req.json();
        // let stuff = await req.json();
        // console.log(stuff)
        console.log(token)

        jwt.verify(token, SECRET_KEY, (err: any) => {
            if(err) return Response.json({"token" : "invalid"})
        })
    console.log(token);
    console.log("valid");

        return Response.json({"token" : "valid"})
    }
    catch (error) {
        console.log("error while checkgin tok : " + error)
    }
}