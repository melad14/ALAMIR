import {User} from "@/models/User";
import mongoose from "mongoose";
import { isAdmin } from "@/app/authOptions.js";

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