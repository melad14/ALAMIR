
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const { cartProducts, deliveryOption, tableNumber, ...orderDetails } = await req.json();


  try {
    const orderDoc = await Order.create({
      userEmail,
      ...orderDetails,
      cartProducts,
      paid: false,
      deliveryOption,
      tableNumber
    });

console.log('orderDoc',orderDoc);
    const redirectUrl = `${process.env.NEXTAUTH_URL}orders/${orderDoc._id}?clear-cart=1`;

    return Response.json({ redirectUrl });
  } catch (error) {
    console.error("Error processing cash payment:", error);
    console.error("Failed to process cash payment");
    return Response.error("Failed to process cash payment", { status: 500 });
  }
}