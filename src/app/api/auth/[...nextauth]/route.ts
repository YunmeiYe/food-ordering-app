import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from "mongoose"
import { User } from "@/app/models/User"
import bcrypt from 'bcrypt'
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/libs/mongoConnect"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

const handler = NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const email = credentials!.email;
        const password = credentials!.password;

        mongoose.connect(process.env.MONGODB_URI!)
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password)

        if (passwordOk) {
          return user
        }
        
        return null
      }
    })
  ]
})

export { handler as GET, handler as POST }