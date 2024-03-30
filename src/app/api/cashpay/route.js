
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import authOptions from "@/app/authOptions.js";


export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const { cartProducts, deliveryOption, tableNumber, address} = await req.json();
  const {  phone,ontherphone,streetAddress,city}=address


  try {
    const orderDoc = await Order.create({
      userEmail,
      phone,ontherphone,streetAddress,city,
      cartProducts,
      paid: false,
      deliveryOption,
      tableNumber
    });

    const redirectUrl = `${process.env.NEXTAUTH_URL}orders/${orderDoc._id}?clear-cart=1`;

    return Response.json({ redirectUrl });
  } catch (error) {
    console.error("Error processing cash payment:", error);
    console.error("Failed to process cash payment");
    return Response.error("Failed to process cash payment", { status: 500 });
  }
}