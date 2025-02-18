import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import SECRET_KEY from '../env';
dotenv.config();
import jwt from 'jsonwebtoken';

export async function POST(req : Request) {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const { email, password } = await req.json();
        console.log(email + "; " + password)
        const db = client.db("chat");
        const usersCollection = db.collection("users");
        const obj = await usersCollection.findOne({ "email": email })

        if(obj) {
            if(await bcrypt.compare(password, obj.password)) {
                console.log('correct pass')
                let sign = jwt.sign(email, SECRET_KEY)
                console.log(sign)
                return Response.json({"access" : sign});
            }
            else {
                return Response.json({"access" : "denied"});
            }
        }
        else {
            return Response.json({"access" : "denied"});
        }
    }
    catch (error) {
        return Response.json({"error" : error})
    }
}