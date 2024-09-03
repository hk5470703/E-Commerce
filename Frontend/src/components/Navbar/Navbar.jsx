import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import {Link} from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import nav_dropdown from '../Assets/arrow.png'

const Navbar = () => {

  const [menu, setmenu] = useState('')
  const {getTotalCartItems} = useContext(ShopContext)
  const menuRef = useRef()

  const handleClick = (event)=>{
    setmenu(event.target.innerHTML)
    console.log(event.target.innerHTML);
    
  }

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open')
  }

  return (
    <>
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <img className='nav-dropdown' src={nav_dropdown} onClick={dropdown_toggle} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={handleClick} className={menu==='Shop' ? "active" : ""  }> <Link style={{ textDecoration: 'none' }} to = '/'>Shop</Link> </li>
            <li onClick={handleClick} className={menu==='Men' ? "active" : ""}> <Link style={{ textDecoration: 'none' }} to = '/mens'>Men</Link> </li>
            <li onClick={handleClick} className={menu==='Women' ? "active" : ""}> <Link style={{ textDecoration: 'none' }} to = '/womens'>Women</Link> </li>
            <li onClick={handleClick} className={menu==='Kids' ? "active" : ""}> <Link style={{ textDecoration: 'none' }} to = '/kids'>Kids</Link> </li>
        </ul>

        <div className="nav-login-cart">

          {localStorage.getItem('auth-token') 
          ?
            <button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace("/");}} > Logout</button>
          :
          <Link to='/login'> <button>Login</button> </Link> 
          }
           
           <Link to='/cart' > <img src={cart_icon} alt="" /> </Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        
    </div>
    <hr />
    </>
  )
}

export default Navbar