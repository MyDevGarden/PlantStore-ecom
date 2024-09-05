import express from 'express';

import { deleteOrderController, orderPaymengtStatusController, orderPaymentController, verifyPaymentController } from '../controllers/paymentController.js';
import { isAdmin, protectdSignIn } from '../middlewares/authMiddleware.js';


const router = express.Router();


// ROUTE 1
router.get('/get-payment', (req, res) => {
    res.json("Payment Details");
})
router.post('/order', protectdSignIn , orderPaymentController);

router.post('/verify' , verifyPaymentController);

router.delete('/delete-order/:id', deleteOrderController);

router.put('/order-status/:orderId', orderPaymengtStatusController)

export default router