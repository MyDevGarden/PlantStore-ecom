import React, { useState, useEffect } from "react";
import Layout from "../../components/BasicLayout/Layout";
import MenuAdmin from "../../components/BasicLayout/MenuAdmin";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard-All Products"}>
      <div className="row">
        <div className="col-md-3">
          <MenuAdmin />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`} className="card-img-top" alt={p.name} style={{ height: "18rem" }} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
