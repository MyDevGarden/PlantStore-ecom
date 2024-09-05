import React,{useState, useEffect} from 'react'
import Layout from '../../components/BasicLayout/Layout'
import MenuAdmin from '../../components/BasicLayout/MenuAdmin'
import { useAuth } from "../../context/authContext";
import axios from "axios";

const Users = () => {
  const [user, setUser] = useState([]);
  const [auth] = useAuth();

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-users`
      );
      setUser(data?.users);
      } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);

  return (
    <Layout title={'Dashboard-All Users'}>
        <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <MenuAdmin/>
            </div>
            <div className="col-md-9">
          <h1 className="text-center">All Users</h1>
          {user?.map((o, i) => {
            return (
              <div className="border shadow" key={o._id}>
                <table className="table table-warning">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">name</th>
                      <th scope="col">address</th>
                      <th scope="col"> phno</th>
                      <th scope="col">email</th>
                      <th scope="col">role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td>{i + 1}</td>
                      <td>{o?.name}</td>
                      <td>{o?.addr}</td>
                      <td>{o?.phno}</td>
                      <td>{o?.email}</td>
                      <td>{o?.role}</td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
            );
          })}
        </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users