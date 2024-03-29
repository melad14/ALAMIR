import {isAdmin} from '@/components/isAdmin.js'
import {User} from "@/models/User";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const admin = await isAdmin();

  if (admin) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}