import React, { useState, useEffect } from "react";
import Layout from "../components/BasicLayout/Layout";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  //const [clientToken, setClientToken] = useState("");
  //const [instance, setInstance] = useState("");
  // const [loading, setLoading] = useState(false);
  const [shippingaddr, setShippingaddr] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  //authenticate token
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  //total price calculations
  const totalPrice = () => {
    try {
      //console.log(cart);
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleshippingaddr = (e) => {
    e.preventDefault();
    e.target.checked ? setShippingaddr(auth?.user?.addr) : setShippingaddr("");
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  useEffect(() => {
    if (!auth?.token) {
      toast.error("logged out, please login again");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      const token = auth?.token;
      if (isTokenExpired(token)) {
        localStorage.removeItem("auth");

        toast.error("Session has expired, please login again");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  }, [navigate, auth?.token]);

  // handlePayment Function
  const handlePayment = async () => {
    if(shippingaddr==="")
    {
      toast.error("Shipping address is empty, pls fill in")
      return;
    }
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      //setLoading(true);
      const order = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/payment/order`,
        {
          cart,
          shippingaddr,
        }
      );

      //

      console.log(order);
      handlePaymentVerify(order.data);
      //toast.success("Payment Completed Successfully ");

      /*if(paystatus==="true")
      {
        updatePaymentStatus(order.id,paystatus)
      }
      setTimeout(() => {
        navigate("/dashboard/user/orders");
      }, 1000);  */
    } catch (error) {
      console.log(error);
    }
  };

  //update Payment status on Order Model

  // handlePaymentVerify Function
  const handlePaymentVerify = async (data) => {
    //console.log(data);
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "MyDreams",
      description: "Test Mode",
      order_id: data.order.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API}/api/v1/payment/verify`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await res.json();
          //console.log(verifyData.success);
          if (verifyData.success) {
            try {
              const { order } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/payment/order-status/${response.razorpay_order_id}`,
                { paymentstatus: "true" }
              );
              console.log(order);
              toast.success(verifyData.message);
              localStorage.removeItem("cart");
              setCart([]);
              setTimeout(() => {
                navigate("/dashboard/user/orders");
              }, 1000);
              //toast.success("Order status changed sucessfully")
            } catch (error) {
              console.log(error);
            }
          } else {
            toast.error(verifyData.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
      modal: {
        escape: false,
        ondismiss: function () {
          toast.error("Payment Cancelled try again");
        },
      },
      theme: {
        color: "#5f63b8",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.open();
    //setLoading(false);
  };

  //delete item from cart
  const removeCartItem = (pid) => {
    try {
      let cartItems = [...cart];
      let i = cartItems.findIndex((item) => item._id === pid);
      cartItems.splice(i, 1);
      setCart(cartItems);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row m-2">
          <div className="col-md-12">
            <h1 className="text-center bg-warning p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row m-2">
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>

            <div className="mt-2">
              <button
                className="btn btn-secondary m-3"
                onClick={() => setShow(true)}
              >
                Checkout
              </button>
              {show && (
            <button className="btn btn-secondary m-3" onClick={handlePayment}>
              Make Payment
            </button>
          )}
            </div>
          </div>
          {show && (
            <div className="form-container col-md-8">
              <form>
                <div>
                  <h2>CheckOut Form</h2>
                  <div className="mb-3">
                    Name :{" "}
                    <input type="text" value={auth?.user?.name} readOnly />
                  </div>
                  <div className="mb-3">
                    email :{" "}
                    <input type="text" value={auth?.user?.email} readOnly />
                  </div>
                  <div className="mb-3">
                    Billing Address :{" "}
                    <input type="text" value={auth?.user?.addr} readOnly />
                  </div>
                  <div className="mb-3">
                    Shipping Address :{" "}
                    <input
                      type="text"
                      name="ship"
                      value={shippingaddr}
                      onChange={(e) => setShippingaddr(e.target.value)}
                    />
                    <Checkbox onChange={(e) => handleshippingaddr(e)}>
                      Same as Billing Address
                    </Checkbox>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          <Toaster />
        </div>
        <div className="row">
          <div className="container">
            {cart?.map((p) => (
              <div className="row mb-2 p-3  flex-row  bg-warning" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`}
                    className=""
                    alt={p.name}
                    width="100px"
                  />
                </div>
                <div className="col-md-8 ">
                  <p>{p.name}</p>
                  <p>{p.desc.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
