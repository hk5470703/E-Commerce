import React, { useState } from "react";
import "./ListProduct.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ListProduct = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/allproducts`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFood = async (productId) => {
    console.log(productId);

    try {
      const response = await axios.post(`http://localhost:4000/removeproduct`, {
        id: productId,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Product List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Title</b>
          <b>Old Price</b>
          <b>New Price</b>
          <b>Category</b>
          <b>Delete Product</b>
        </div>

        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.old_price}</p>
              <p>{item.new_price}</p>
              <p>{item.category}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                {" "}
                x{" "}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
