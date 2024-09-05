import React, { useState, useEffect } from "react";
import Layout from "../../components/BasicLayout/Layout";
import MenuAdmin from "../../components/BasicLayout/MenuAdmin";
import toast , { Toaster } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from 'antd'
import '../../styles/dashcard.css'

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("")

  //handle form
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
       const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/add-category`,{name,});
        if(data?.success)
        {
          toast.success(`${name} is created`);
          getAllCategory();
        }
        else{
          toast.error(data.message);
        }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong in input field')
    }
  };

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

  //Update Category
  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name:updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName("")
        setModalOpen(false)
        getAllCategory();
      }
    } catch (error) {
      toast.error('something went wrong')
    }
  }


  //delete category
  const handleDelete = async(id)=>{
    
    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
      if(data.success){
        toast.success(`category is deleted`)
        getAllCategory();
      }
    } catch (error) {
      toast.error('something went wrong')
    }
  }

  return (
    <Layout title={"Dashboard-Add Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <MenuAdmin />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
              <Toaster/>
            </div>
            <div className="w-75">
              <table className="table table-warning table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr key={c._id}>
                        <td >{c.name}</td>
                        <td>
                          <button className="btn btn-secondary ms-2" onClick={() => {setModalOpen(true) ; setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>handleDelete(c._id)}>Delete</button>
                          <Toaster/>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => 
              setModalOpen(false)} footer={null} open={isModalOpen}>
                  <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
              <Toaster/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
