import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/libs/mongoConnect';
import { User } from '@/models/User';
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    session:{
      jwt: true,
      strategy: "jwt"
    },
  
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const email = credentials?.email;
          const password = credentials?.password;
  
          mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({email});
          const passwordOk = user && bcrypt.compareSync(password, user.password);
          if (passwordOk) {
  
            return user;
          }
  
          return null
        }
      })
    ],
  };