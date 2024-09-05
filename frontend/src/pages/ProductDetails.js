import Layout from "../components/BasicLayout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Slider from "react-slick";
import "../styles/homestyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [similarproducts, setSimilarProducts] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
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

  //initial state details
  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  //get Product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product?.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/similar-products/${pid}/${cid}`
      );
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container m-5 ">
        <div className="card-body ">
          <div className="col-md-3 m-3 ">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${product._id}`}
              className="card-img-top"
              alt={product.name}
              style={{ width: "18rem", height: "20rem" }}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="col-md-9 text-center mt-5">
            <h4>Product Details</h4>
            <h5>Name : {product.name}</h5>
            <h5>Decription : {product.desc}</h5>
            <h5>Price : Rs. {product.price}</h5>

            <h5>Category : {product?.category?.name}</h5>
            <button
              className="btn btn-secondary ms-1"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("item added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="row container text-center ">
        <div className="col-md-2 ">
          
        </div>
        <div className="col-md-9 ml-10">
          <h1>Similar Products</h1>

          {similarproducts.length < 1 && <p>No similar Products Found</p>}
          <div className="slider-container">
            <Slider {...settings}>
              {similarproducts?.map((p) => (
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
                  <div className="card-body ">
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
