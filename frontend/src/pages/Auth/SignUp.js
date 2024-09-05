import React, { useState } from "react";
import Layout from "../../components/BasicLayout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/authstyles.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phno, setPhno] = useState("");
  const [addr, setAddr] = useState("");
  const [answer, setAnswer] = useState("");
const navigate = useNavigate();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phno, addr, answer }
        
      );
      if(res.data.success){    //success and message is comming from authcontroller with responce
        toast.success(res.data.message)
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

  /*const handleLogin = (e) =>{
    e.preventDefault();
    navigate('/login');
  }*/

  return (
    <Layout title={"Registration"}>
      <div className="form-container">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Name"
              required
            />
          </div>
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
            <input
              type="text"
              value={phno}
              onChange={(e) => setPhno(e.target.value)}
              className="form-control"
              id="exampleInputphone"
              placeholder="Enter phone no"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              className="form-control"
              id="exampleInputaddr"
              placeholder="Enter address"
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
              placeholder="What is your mothers name"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
          
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
