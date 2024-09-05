import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protect routes using JWT tokens
export const protectdSignIn = async(req,res,next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;// get the decoded user details
        next();
    } catch (error) {
        console.log(error)
    }
}

//admin access
export const isAdmin= async(req, res, next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: 'UnAuthorised Accsess - not an Admin'
            })
        }else{
            next();
        }
    } catch (error) {
        res.status(401).send({
            success: false,
            message: 'Error in admin middleware ',
            error
        })
        console.log(error);
    }
}