import React from 'react'
import Buy from './Buy'

const Product = ({ product }) => {
  const { id, name, price, description, image_url } = product

  return (
    <div className='item-card carousel-cell'>
      <div className='product-photo '>
        <div className='product' style={{backgroundImage: `url("${image_url}")`}}></div>
      </div>
      <div className='product-info'>
        <div className='product-title'>{name}</div>
        <div className='product-artist'></div>
        <div className='product-descript'>{product.author}</div>
        <Buy itemID={id} price={price} />
      </div>
    </div>
  )
}

export default Product
