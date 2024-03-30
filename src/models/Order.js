import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  userEmail: String,
  phone: String,
  ontherphone: String,
  streetAddress: String,
  city: String,
  tableNumber: String,
  deliveryOption: String,
  cartProducts: Object,
  paid: {type: Boolean, default: false},
  iscomplete: {type: Boolean, default: false},
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema);