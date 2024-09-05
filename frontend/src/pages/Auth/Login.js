
import React, { useState } from "react";
import Layout from "../../components/BasicLayout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/authstyles.css";
import { useAuth } from "../../context/authContext";


const Login = () => {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location= useLocation();
  const navigate = useNavigate();

//form function
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {  email, password }
        
      );
      if(res && res.data.success){    //success and message is comming from authcontroller with responce
        toast.success(res.data && res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state||'/')
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
    <Layout title={"Login"}>
      <div className="form-container">
        <h1>Register Page</h1>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mb-3">
          <button type="submit" className="btn btn-primary" onClick={()=> {navigate('/forgot-pwd')}}>
            Forgot Password
          </button>
          </div>

          
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          
        </form>
      </div>
    </Layout>
  )
}

export default Login