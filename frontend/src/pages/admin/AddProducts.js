import React, { useState, useEffect } from "react";
import Layout from "../../components/BasicLayout/Layout";
import MenuAdmin from "../../components/BasicLayout/MenuAdmin";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //retrive all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newproduct = new FormData();
      newproduct.append("name", name);
      newproduct.append("desc", desc);
      newproduct.append("price", price);
      newproduct.append("quantity", quantity);
      newproduct.append("photo", photo);
      newproduct.append("category", category);
      newproduct.append("shipping", shipping);
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/add-product`,
        newproduct
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1000);   
       
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard-Add Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <MenuAdmin />
          </div>
          <div className="col-md-9">
            <h1>Create Products</h1>
            <div className="m-1 w-75">
              <Select
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3 bg-warning"
                onChange={(value) => {
                  setCategory(value);
                }}
                
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)} //using browsers property to get url of photo
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3 ">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  className="form-control bg-warning"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={desc}
                  placeholder="Enter description"
                  className="form-control bg-warning"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Price"
                  className="form-control bg-warning"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter quantity"
                  className="form-control bg-warning"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3 bg-warning"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
                <Toaster/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProducts;
