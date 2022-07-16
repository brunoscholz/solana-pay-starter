import React from 'react'
import styles from '../styles/Product.module.css'
import IPFSDownload from './IpfsDownload'

const Product = ({ product }) => {
  const { id, name, price, description, image_url } = product

  return (
    <div className='item-card carousel-cell'>
      <div className='product-photo '>
        <img src={image_url} alt={name} className='product ' />
      </div>
      <div className='product-info smaller'>
        <div className='product-title'>{name}</div>
        <div className='product-artist'></div>
        <div className='product-descript'>{product.author}</div>
        <div className='listen yellow'>
          <div className='pricw'>{price} USDC</div>
          <IPFSDownload
            filename='emojis.zip'
            hash='QmWWH69mTL66r3H8P4wUn24t1L5pvdTJGUTKBqT11KCHS5'
            cta='Download emojis'
          />
        </div>
      </div>
    </div>
  )
}

export default Product
