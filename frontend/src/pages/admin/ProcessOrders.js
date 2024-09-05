import React, { useState, useEffect } from "react";
import Layout from "../../components/BasicLayout/Layout";
import MenuAdmin from "../../components/BasicLayout/MenuAdmin";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const ProcessOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleStatusChange = async(oid, val) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_API}/api/v1/auth/order-status/${oid}`, {status:val}
          );
          if(data)
            toast.success("Order status changed sucessfully")
          getOrders();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Layout title={"Order Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <MenuAdmin />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow" key={i}>
                <table className="table table-warning">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Order Id</th>
                      <th scope="col"> date</th>
                      <th scope="col">Total amount</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          onChange={(value) => handleStatusChange(o._id,value)}
                          defaultValue={o?.status}
                          style={{
                            width: 150,
                          }}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s} >
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{o?.razorpay_order_id}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.totalamt}</td>
                      <td>{o?.products?.length}</td>
                      <td>{o?.paymentstatus ==="true" ? "Paid" : "Not Paid"}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3  flex-row  bg-warning" key={i}>
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`}
                          className=""
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.desc.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ProcessOrders;
