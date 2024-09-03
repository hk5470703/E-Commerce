import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItem = () => {
  
  const {all_product, removeFromCart, cartItems,getTotalCartAmount} = useContext(ShopContext)

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) => {

        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format" >
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p  className='name'>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
              </div>
              <hr />
            </div>
          );
        }
      return null
      })}

<div className="cart-total">
         
         <div className='cart-first'>
         <h2>Cart-Totals</h2>
           <div className="cart-total-details">
             <p>Subtotal</p>
             <p>${getTotalCartAmount()}</p>
           </div>
           
           <div className="cart-total-details">
             <p>Shipping Fee</p>
             <p>Free</p>
           </div>
           <hr />
           <div className="cart-total-details">
             <p>Total</p>
             <p>${getTotalCartAmount()}</p>
           </div>
           <button>PROCEED TO Payment</button>
         </div>
         <div className="cart-promocode">
           <div>
             <p>If you have promo code, Enter It here</p>
             <div className="cart-promocode-input">
               <input type="text" placeholder='promo code' />
               <button >Submit</button>
             </div>
           </div>
         </div>
     </div>


    </div>
  );
}

export default CartItem