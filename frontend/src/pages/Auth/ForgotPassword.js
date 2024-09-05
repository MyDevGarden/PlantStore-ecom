
import React, { useState } from "react";
import Layout from "../../components/BasicLayout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import "../../styles/authstyles.css";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newpassword, setnewPassword] = useState("");
    const [answer, setAnswer]= useState("");
   

    const navigate = useNavigate();
  
  //form function
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/forgot-pwd`,
          {  email, newpassword, answer }
          
        );
        if(res && res.data.success){    //success and message is comming from authcontroller with responce
          toast.success(res.data && res.data.message)
          
         
          setTimeout(() => {
            navigate('/login');
          }, 1000);  
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

  return (
    <Layout title={'Forgot Password -Platnstore'}>
       <div className="form-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputanswer"
              placeholder="Enter your mothers name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newpassword}
              onChange={(e) => setnewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your new password"
              required
            />
          </div>
                    
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
          
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
