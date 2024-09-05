import dotenv from "dotenv";
import crypto from 'crypto';
import Razorpay from 'razorpay';
import paymentModel from "../models/paymentModel.js";
import orderModel from "../models/orderModel.js";

dotenv.config();

//payment gateway
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// ROUTE 1 : Create Order Api Using POST Method http://localhost:3000/api/payment/order
export const orderPaymentController = async (req, res) => {
    
        
    const {  cart, shippingaddr } = req.body;
   // console.log(req.body)
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    try {
        const options = {
            amount: Number(total * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }else{
                //res.status(200).json({ data: order });
                console.log(order.status);
               
                const neworder = new orderModel({
                    razorpay_order_id : order.id,
                    products: cart,
                    totalamt: total,
                    buyer: req.user._id,
                    shippingaddr: shippingaddr
                  }).save();
                  res.status(200).send({
                    success:true,
                    order,
                    neworder,
                  });
                 //res.status(200).json({ data: order });
                
            }
           
            //console.log(order)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

// ROUTE 2 : Create Verify Api Using POST Method http://localhost:3000/api/v1/payment/verify
export const verifyPaymentController = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

     console.log("req.body", req.body);

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // console.log(razorpay_signature === expectedSign);

        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;

        // Condition 
        if (isAuthentic) {
            const payment = new paymentModel({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            // Save Payment 
            await payment.save();

            // Send Message 
            res.json({
                
                success: true,
                message: "Payement Successfully"
            });
        }else{
            console.log("failed")
            res.json({
                success: false,
                message: "Payement Failed"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

export const deleteOrderController = async (req, res) => {
    try {
        await orderModel.findByIdAndDelete(req.params.id).select("-photo");
        res.status(200).send({
          success: true,
          message: "order deleted sucessfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error: error.message,
          message: " Error while deleting order",
        });
      }
}

//updatepaymentstatus of order

export const orderPaymengtStatusController = async(req, res) =>{
    try {
        console.log("request")
        console.log(req.params.orderId)
        console.log(req.body)
        const { orderId } = req.params
        const { paymentstatus } = req.body
       
        const orders = await orderModel.findOneAndUpdate({razorpay_order_id: orderId}, {$set: {paymentstatus: paymentstatus}}, {new:true})
        res.status(200).send({
            success: true,
           
            orders
          });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while updating payment status of order",
            error,
          });
    }
    }
