import React, { useState } from 'react'
import './Popular.css'
import Item from '../Item/Item.jsx'
import axios from 'axios'
import { useEffect } from 'react'

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([])

  const popularWomen = async () => {
    try {
      
    const response = await axios.get("http://localhost:4000/popularinwomen")
    setPopularProducts(response.data)
    console.log('success women popular');

    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    popularWomen()
  }, [])
  return (
    <div className='popular'>
        <h1>Popular in Women</h1>
        <hr />
        <div className="popular-img">
            {popularProducts.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}  />
        })}
        </div>
        
    </div>
  )
}

export default Popular