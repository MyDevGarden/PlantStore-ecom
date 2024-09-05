import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePwd, hashPwd } from "../utils/authutil.js";
import JWT from "jsonwebtoken";

export const registerController = async(req, res) => {
    try {
        const {name,email,password,phno,addr, answer} = req.body;
        console.log(req.body);
        //validation
        if(!name){
            return res.send({message: 'Name is Required'});
        }
        if(!email){
            return res.send({message: 'Email is Required'});
        }
        if(!password){
            return res.send({message: 'Password is Required'});
        }
        if(!phno){
            return res.send({message: 'Phone number is Required'});
        }
        if(!addr){
            return res.send({message: 'Address is Required'});
        }
        if(!answer){
            return res.send({message: 'Secret answer is Required'});
        }

        //Allready registered
        const existinguser = await userModel.findOne({email})
        
        if(existinguser){
            return res.status(200).send({
                success: false,
                message: 'Already registered please login',
            })
        }
        //register new user
        const hashedPassword = await hashPwd(password);
        console.log(hashedPassword);
        //save in database
        const newuser = await new userModel({name,email,phno,addr,password:hashedPassword,answer}).save();
        res.status(201).send({
            success:true,
            message:'User Registered Sucessfully',
            newuser
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: ' Error in Registration',
            error
        })
    }
}

export const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log(req.body);
        if(!email || !password)
        {
            return res.status(404).send({
                success: false,
                message : 'email and password required'
            })
        }
        //check email registered or not
        const user = await userModel.findOne({email})
        if(!user)
        {
            return res.status(200).send({
                success: false,
                message : 'email is not registered'
            })
        }
        //match password with encrypted password from database
        const match = await comparePwd(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Password is Incorrect'
            })
        }
        //if authenticated properly then
        //create JWT token for that user
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn: "1d"});
        res.status(200).send({
            success: true,
            message: ' Login successfull',
            user:{
                _id: user._id,
                name: user.name,
                email:user.email,
                phno:user.phno,
                addr:user.addr,
                role:user.role,
            },
            token,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
      
    }
};


//forgot password controller
export const forgotpwdController = async (req, res) => {
    console.log(req.body);
    try {
      const { email, answer, newpassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newpassword) {
        res.status(400).send({ message: "New Password is required" });
      }

      const user = await userModel.findOne({ email, answer });

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPwd(newpassword);
      console.log(hashed);
     await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };


//test controller
export const testController = (req,res) =>{
    res.send('protected route');
}


//update profile controller
export const updateProfileController = async(req,res) =>{
    try {
        const {name,email,password, phno,addr} = req.body;
        const user = await userModel.findById(req.user._id)
        //check password
        if(password && password.length < 6)
        {
            return res.json({error: 'Password is required'})
        }
        const hashedPassword = password ? await hashPwd(password) : undefined;
        const updatedUser= await userModel.findByIdAndUpdate(req.user._id,{
            name: name || user.name,
            password : hashedPassword || user.password,
            phno : phno || user.phno,
            addr : addr || user.addr
        },{new:true});
        res.status(200).send({
            success: true,
            message: "Profile updated Successfully",
            updatedUser,
          });
    } catch (error) { 
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
          });
    }
}

//  get user spesific orders
export const getOrderController = async(req, res) =>{
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("products", "-photo").populate("buyer","name").sort({createdAT: -1 });
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while getting orders",
            error,
          });
    }
}

//get all orders for admin
export const getAllOrderController = async(req, res) =>{
    try {
        const orders = await orderModel.find({}).populate("products", "-photo").populate("buyer","name").sort({createdAt: -1});
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while getting orders",
            error,
          });
    }
}

//update status of orders
export const orderStatusController = async(req, res) =>{
try {
    const { orderId } = req.params
    const { status } = req.body
    const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
    res.json(orders)
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "error while updating status of order",
        error,
      });
}
}

//get all users data
export const usersController = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).send({
        success: true,
        message: "All users List",
        users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all users",
      });
    }
  };