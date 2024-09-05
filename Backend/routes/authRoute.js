import express from 'express'
import {registerController, loginController, testController, forgotpwdController, updateProfileController, getOrderController, getAllOrderController, orderStatusController, usersController} from '../controllers/authController.js'
import {isAdmin, protectdSignIn} from '../middlewares/authMiddleware.js'
const router = express.Router();

//register route
router.post('/register', registerController )

//login route
router.post('/login', loginController )

//test routes
router.get('/test',protectdSignIn, isAdmin, testController);

//Forgot password
router.post('/forgot-pwd', forgotpwdController)

//protected route auth for user

router.get('/user-auth', protectdSignIn, (req,res) =>{
    res.status(200).send({ok:true});
})

//protected route auth for admin

router.get('/admin-auth', protectdSignIn, isAdmin,   (req,res) =>{
    res.status(200).send({ok:true});
})
//protected route to update Profile
router.put('/profile', protectdSignIn , updateProfileController)

//protectes route to get order list
router.get('/orders', protectdSignIn, getOrderController)

//protectes route to get order list
router.get('/all-orders', protectdSignIn, isAdmin, getAllOrderController)

//protected route to get all users list
router.get('/all-users', protectdSignIn, isAdmin, usersController)

//protectes route for order status update
router.put('/order-status/:orderId', protectdSignIn, isAdmin, orderStatusController)

export default router;
