import React, { useState } from "react";
import "./AddProduct.css";
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import upload_area from "../../Assets/upload_area.svg";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const [data, setData] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "Women",
    image: ""
  })

  const onChangeHandler = (e)=>{
    const {name, value} = e.target;

    setData((prevValue)=>({...prevValue, [name] : value}))
   
    
  }


  
  
const onSubmitHandler = async (e) => {
  e.preventDefault();



  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('old_price', data.old_price);
    formData.append('new_price', Number(data.new_price));
    formData.append('category', data.category);
    formData.append('product', image);
    const response = await axios.post(`http://localhost:4000/upload`, formData);
    console.log(response);
    if (response.data.success) {
      data.image = response.data.image_url;
      console.log(data);

      const responseTwo = await axios.post('http://localhost:4000/addproduct', data);

      if (responseTwo.data.success) {
        console.log('true');
        setData({
          name: "",
          old_price: "",
          new_price: "",
          category: "Women",
          image: image
        });
        setImage(false)
        toast.success('added successfully')
      } else {
        console.log(false);
        toast.error(responseTwo.data.message); // Handle errors from addproduct
      }
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("An error occurred. Please try again."); // Handle general errors
  }
};

  //this is my model in db ' const product = new Product({         id:  id,         name: req.body.name,         image: req.body.image,         category: req.body.category,         new_price: req.body.new_price,         old_price: req.body.old_price,     })'  now on submitting form i face this issue 

  return (
    <div className="add-product">
      <form action="" onSubmit={onSubmitHandler}>
        <div className="addproduct-itemfield">
          <p>Product Title</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input onChange={onChangeHandler} value={data.old_price} type="text" name="old_price" placeholder="Type here" />
          </div>
          <div className="addproduct-itemfield">
            <p> Offer Price</p>
            <input onChange={onChangeHandler} value={data.new_price} type="text" name="new_price" placeholder="Type here" />
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select onChange={onChangeHandler} value={data.category} name="category" id="" className="add-product-selector">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              className="addproduct-thumbnail-img"
              alt=""
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            
            id="file-input"
            hidden
          />
        </div>
        <button type="submit" className="addproduct-btn">ADD</button>
      </form>
    </div>
  );
};

export default AddProduct;
