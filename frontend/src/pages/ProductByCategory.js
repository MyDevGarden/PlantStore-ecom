import React, { useState, useEffect } from "react";
import Layout from "../components/BasicLayout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cartContext";
import Slider from "react-slick";
import "../styles/homestyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Prices } from "../components/PriceFilter";
import { Radio } from "antd";

const ProductByCategory = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedradio, setSelectedradio] = useState([]);
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();

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
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  useEffect(() => {
    if (selectedradio.length) handleProductFilter();
  }, [selectedradio]);

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setSelected(data?.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductFilter = async () => {
    //console.log(selected)
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
    <Layout title="Products By Category">
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters ">
          <h4 className="text-center mt-12">Filter By Price</h4>
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
        <div className="col-md-8 ml-15">
          <h3 className="text-center">Category- {category?.name}</h3>
          <h5 className="text-center">{products?.length} result found</h5>

          <div className="slider-container">
            <Slider {...settings}>
              {products?.map((p) => (
                <div key={p._id}>
                  <div
                    className="card m-2"
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
          {/*<div className="m-2 p-3">
            {products && products.length< count && (
              <button className="btn btn-warning" onClick={(e) =>{
                e.preventDefault();
                setPage(page+1);
              }}>
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>*/}
        </div>
      </div>
    </Layout>
  );
};

export default ProductByCategory;
