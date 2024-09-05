import React, {useEffect, useState} from 'react'
import Layout from '../../components/BasicLayout/Layout'
import MenuUser from '../../components/BasicLayout/MenuUser'
import { useAuth } from '../../context/authContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phno, setPhno] = useState("");
  const [addr, setAddr] = useState("");

  //Get User Profile info
  useEffect(() =>{
    const {email, name,  phno, addr} = auth?.user
    setName(name);
    setEmail(email);
    setPhno(phno)
    setAddr(addr)
  },[auth?.user])

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phno, addr }
      
      );
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth, user:data?.updatedUser})
        let local = localStorage.getItem('auth')
        local = JSON.parse(local)
        local.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(local))
        toast.success("Profile Updated Sucessfully");
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title='Your Profile'>
        <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <MenuUser/>
            </div>
            <div className='col-md-9'>
            <div className="form-container">
        <h1>User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Name"
              
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
              
              disabled
            />
          </div>
          {/*<div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter password"       
            />
          </div>*/}
          <div className="mb-3">
            <input
              type="text"
              value={phno}
              onChange={(e) => setPhno(e.target.value)}
              className="form-control"
              id="exampleInputphone"
              placeholder="Enter phone no"
              
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
              
            />
          </div>
     

          <button type="submit" className="btn btn-primary">
            Update
          </button>
          
        </form>
      </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Profile