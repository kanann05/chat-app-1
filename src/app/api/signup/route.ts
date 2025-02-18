import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import SECRET_KEY from "../env";
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    const { email, username, password } = await req.json();
    await client.connect();
    const db = client.db("chat");
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ "email" : email });
    if (existingUser) {
      return Response.json({ success: false, message: "Email already exists." }, { status: 400 });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = {
      username : username,
      email : email,
      password: hashedPassword,
      // createdAt: new Date(),
      invites : [],
      socketID : email
    };

    const result = await usersCollection.insertOne(newUser);
    // console.log("yeehaw")
    let sign = jwt.sign(email, SECRET_KEY)
    return Response.json({ success: true, token : sign });
  } catch (error) {
    console.log(error);
    return;
  } finally {
    await client.close();
  }
}
