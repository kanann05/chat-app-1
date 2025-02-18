import {MongoClient} from 'mongodb';

export async function POST(req : Request) {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        let email = await req.json();
        console.log(email)
        const db = client.db("chat");
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ "email": email });

        if(user) {
            console.log("user found");

            return Response.json({"username" : user.username});
        }
        else {
            return Response.json({"username" : ""})
        }
    }
    catch(error) {
        console.log("error while finding user : " + error)
    }
}
