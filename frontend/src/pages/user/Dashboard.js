import React from 'react'
import Layout from '../../components/BasicLayout/Layout'
import MenuUser from '../../components/BasicLayout/MenuUser'
import { useAuth } from '../../context/authContext'
import '../../styles/dashcard.css'
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title='User Dashboard'> 
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <MenuUser/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3 text dashcard'>
                
              <h3>Name : {auth?.user?.name}</h3>
              <h3>email : {auth?.user?.email}</h3>
              <h3>Address : {auth?.user?.addr}</h3>
              </div>
            </div>
          </div>
        </div>
    </Layout>
    
  )
}


export default Dashboard