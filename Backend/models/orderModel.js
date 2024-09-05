import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    razorpay_order_id: 
    {
      type: String,
      ref: "Payment",
    },
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    totalamt:{
      type: String,
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
    shippingaddr: {
      type: String,
      required: true,
    },
    paymentstatus: {
      type: String,
      default: "false"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);