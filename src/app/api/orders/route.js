import {isAdmin} from '@/components/authOptions.js'
import { authOptions } from "@/components/authOptions.js";

import {Order} from "@/models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import { NextResponse } from "next/server.js";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (_id) {
    return Response.json( await Order.findById(_id) );
  }


  if (admin) {
    return Response.json( await Order.find() );
  }

  if (userEmail) {
    return Response.json( await Order.find({userEmail}) );
  }

}

// export async function PUT(req) {
//   await mongoose.connect(process.env.MONGO_URL);

//   const admin = await isAdmin();

//   if (admin) {
//   const data = await req.json();
//   const {_id,iscomplete, paid } = data;
//   if (_id) {
    
//    const updatedOrder= await Order.findByIdAndUpdate(_id, {iscomplete, paid},{new:true});

//     return NextResponse.json({updatedOrder}) 
//   } 
//   else{
//     return  console.error('error update order')

//   }
//  }
//  else{
//   NextResponse.json({message:'you cant do this action you are not admin'}) 
//  }

// }
export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const admin = await isAdmin();

  if (admin) {
    const data = await req.json();
    const {_id, iscomplete, paid } = data;
    if (_id) {
      try {
        const updatedOrder = await Order.findByIdAndUpdate(_id, {iscomplete, paid}, {new:true});
        return NextResponse.json({ updatedOrder });
      } catch (error) {
        return NextResponse.error(500, 'Error updating order: ' + error.message);
      }
    } else {
      return NextResponse.error(400, 'Missing _id parameter');
    }
  } else {
    return NextResponse.error({ message: 'You can\'t do this action, you are not admin' }); 
  }
}
