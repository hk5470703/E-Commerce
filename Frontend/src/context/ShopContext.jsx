import { createContext, useEffect, useState } from "react";
import all_product from '../components/Assets/all_product'
import axios from "axios"


export const ShopContext = createContext(null) 

const getDefaultCart = ()=>{
    const cart = {}
    for (let index = 0; index < all_product.length; index++) {
        cart[index] = 0
    }
    return cart
}


const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());

    const [food_list, setFoodList] = useState([]);


        const fetchFoodList = async () => {
            const response = await axios.get("http://localhost:4000/allproducts");
            setFoodList(response.data.data);
        }

    // const addToCart = async(itemId) => {
    //     setCartItems(prev => (
    //         {...prev, [itemId] : prev[itemId]+1}
    //     ))
    //    if (localStorage.getItem('auth-token')) {
    //     const headers = {
    //         "auth-token": `Bearer ${localStorage.getItem('auth-token')}`
    //       };
    //     const response = await axios.post('http://localhost:4000/addtocart', {"itemId" : itemId}, headers)
    //     console.log(response);
        
    //    }
        
    // }
    const addToCart = async (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      
        if (localStorage.getItem('auth-token')) {
          const headers = {
            'auth-token': localStorage.getItem('auth-token')
          };
      
          try {
            const response = await axios.post('http://localhost:4000/addtocart', { "itemId": itemId }, {headers});
            console.log('Product added to cart:');
          } catch (error) {
            console.error('Error adding product to cart:', error || error.message); // Handle both server-side and client-side errors
          }
        }
      };
    const removeFromCart = async(itemid) => {
        setCartItems(prev => (
            {...prev, [itemid] : prev[itemid]-1}
        ))

       
        if(localStorage.getItem('auth-token')) {
            const headers = {
                'auth-token': localStorage.getItem('auth-token')
              };
                await axios.post('http://localhost:4000/removefromcart' , {"itemId": itemid}, {headers})
            }
        }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find(product => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item]
            }
        }
        return totalItem
    }

    const loadCartData = async () => {
        const headers = {
            'auth-token': localStorage.getItem('auth-token')
          }
        const response = await axios.post("http://localhost:4000/getcart", {}, {headers})
        setCartItems(response.data);
    }

    useEffect(()=>{
            

        async function loadData() {
          await fetchFoodList();
          if (localStorage.getItem("auth-token")) {
            await loadCartData()
          }
        }
        loadData();

    }, [])



    const contextValue = {
        food_list,
        all_product,
        addToCart,
        removeFromCart,
        cartItems,
        getTotalCartAmount,
        getTotalCartItems
    }

    return(
        <ShopContext.Provider value={contextValue}>
        {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider


