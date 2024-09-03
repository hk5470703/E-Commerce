import React, { useContext, useState } from 'react'
import './NewCollections.css'

import Item from '../Item/Item.jsx'
import { useEffect } from 'react'
import axios from 'axios'
const NewCollections = () => {

  const [new_collection, setNew_collection] = useState([])

  const NewCollection= async() => {
    
    try {
      const response = await axios.get("http://localhost:4000/newcollections");
      setNew_collection(response.data)
      console.log('success');
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
     NewCollection()
  }, [])

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />

        <div className="collections">
            {new_collection.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default NewCollections