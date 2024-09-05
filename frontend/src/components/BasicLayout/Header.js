import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext"; 
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import toast from "react-hot-toast";
import SearchInputBox from "../Forms/SearchInputBox";
import useCategory from "../../hooks/useCategory";
import {Badge} from 'antd'
import bannar from '../../images/Bannar/bannar2.webp'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    toast.success("Logged out Successfully");
  };


  //authenticate token

  const authenticate = () => {
    if (!auth?.token) {
      toast.error("Session has expired, please login again");
      navigate("/login");
    }else
       {
        const token = auth?.token;
        if (isTokenExpired(token)) {
          localStorage.removeItem('auth');
          
          //toast.error("Session has expired, please login again");
          setTimeout(() => {
            navigate('/login');
          }, 1000);  
        }}

  }
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🪴 My Plant-Store
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInputBox />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  
                  {categories?.map((c) => (
                    <li  key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                       
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">
                      SignUp
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>

                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          onClick={authenticate}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          onClick={handleLogout}
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="nav-link">
                  Cart 
                </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div><img src={bannar} alt = "mydreams" width={"100%"} height="200"/></div>
    </>
  );
};

export default Header;
