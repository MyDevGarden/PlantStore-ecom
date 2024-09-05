import React, { useState, useEffect } from "react";
import Layout from "../components/BasicLayout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/PriceFilter";
import { useCart } from "../context/cartContext";
import { AiOutlineReload } from "react-icons/ai";
import toast from "react-hot-toast";
import Slider from "react-slick";
import "../styles/homestyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedradio, setSelectedradio] = useState([]);
  const [check, setCheck] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
         
          
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          
        }
      }
    ]
    }

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
    }
  };

  //get total count of products
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      if (data?.success) {
        setCount(data?.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotalCount();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      console.log(data);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //filter by category
  const handleFilter = (val, id) => {
    //setCheck(true);
    let all = [...selected];
    if (val) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setSelected(all);
    console.log(selected);
  };

  useEffect(() => {
    if (selected.length === 0 || selectedradio.length === 0) getAllProducts();
  }, [selected, selectedradio]);

  useEffect(() => {
    if (selected.length || selectedradio.length) handleProductFilter();
  }, [selected, selectedradio]);

  //filter by products
  const handleProductFilter = async () => {
    //setCheck(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/filter-product`,
        { selected, selectedradio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Best Offers-shop now"}>
      <div className="container-fluid row mt-3 home-page p-5">
        <div className="col-md-2 filters ">
          <h4 className="text-center mt-12">Filter By Category</h4>

          <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <div key={c._id}>
                <Checkbox
                  onChange={(e) => {setSelected(e.target.value); handleFilter(e.target.checked, c._id)}}
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setSelectedradio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-8 ml-15">
          <h1 className="text-center">All Products</h1>
          
          <div className="slider-container">
          <Slider {...settings}>
            {products?.map((p) => (
              <div key={p._id}>
                
                <div
                  className="card m-2 "
                  style={{ width: "18rem" }}
                  
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`}
                    className="card-img-top"
                    style={{ width: "18rem", height: "20rem" }}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.desc.substring(0, 30)}</p>
                    <p className="card-text card-price">Rs. {p.price}</p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-custom ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );

                          toast.success("item added to cart");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
               
              </div>
             
            ))}
            </Slider>
          </div>
          
          <div className="m-2 p-3">
            {products && products.length < count && !check && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
