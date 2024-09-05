import Layout from "../components/BasicLayout/Layout";
import React from 'react'
import { useSearch } from '../context/searchContext'
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";
import "../styles/homestyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SearchBox = () => {
    const [values] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
 

  
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
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
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

      
  return (
    <Layout title='Search Products'>
        <div className="container-fluid row mt-3 home-page">
        <div className="col-md-2 filters ">
                  
                  
                  <div className="d-flex flex-column">
                    
                  </div>
                  <div className="d-flex flex-column">
             
                  </div>
                </div>
        <div className="col-md-8 ml-15">
            <div className='text-center'>
                <h1>Search Products</h1>
                <h6>{values?.results.length<1 ? "No products found" : `Found ${values?.results.length}`}</h6>
            </div>
            <div className="slider-container">
            <Slider {...settings}>
          {values?.results.map((p) => (
              
              
                <div className="card m-2" style={{ width: "18rem"}} key={p._id}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`} className="card-img-top" style={{ width: "18rem", height: "20rem"}} alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.desc.substring(0,30)}</p>
                    <p className="card-text card-price">Rs. {p.price}</p>
                    <button className="btn btn-custom ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className="btn btn-secondary ms-1"  onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("item added to cart");
                    }}>Add to Cart</button>
                  </div>
                </div>
             
            ))}
</Slider>
</div>
          </div>
        </div>
    </Layout>
  )
}

export default SearchBox