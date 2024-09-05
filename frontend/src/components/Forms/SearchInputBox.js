import React, { useState } from "react";
import { useSearch } from "../../context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInputBox = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/search-product/${values.keyword}`
              );
              setValues({...values, results:data})
              navigate('/search');
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-4"
          type="search"
          placeholder="Search"
          aria-label="Search"
          
          value={values.keyword}
          onChange={(e)=>
            setValues({...values, keyword:e.target.value})
          }
        />
        <button className="btn btn-outline-warning" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInputBox;
