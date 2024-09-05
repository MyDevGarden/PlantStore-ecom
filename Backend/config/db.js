import mongoose from 'mongoose'

const connectDB = async () =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to database ${con.connection.host}`);
    }catch(error){
        console.log(`Error in connecting mongodb ${error}`);
    }
}

export default connectDB;