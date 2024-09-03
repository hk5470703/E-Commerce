import React, { useContext } from 'react'
import CartItem from '../components/CartItems/CartItems'
import { ShopContext } from '../context/ShopContext'

const Cart = () => {

  return (
    <div>
      <CartItem />
    </div>
  )
}

export default Cart