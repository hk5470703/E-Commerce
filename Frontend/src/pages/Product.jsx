import React, { useContext } from 'react'
import '../pages/CSS/Product.css'
import {useParams} from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'
import ProductDisplay from '../components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../components/DescriptionBox/DescriptionBox'
import RelatedProduct from '../components/RelatedProduct/RelatedProduct'

const Product = () => {

  const {food_list} = useContext(ShopContext);
  const {productId} = useParams();
  const parsedProductId = parseInt(productId, 10);

  const product = food_list.find((e) => e.id === parsedProductId);


  return (
    <div className='product'>
      <BreadCrumbs product={product}/>
      <ProductDisplay product={product} id={food_list.id}/>
      <DescriptionBox />
      <RelatedProduct />
    </div>
  )
}

export default Product