import { PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'
import Product from './Product'
import CreateProduct from './CreateProduct'

const Body = () => {
  // This will fetch the users' public key (wallet address) from any wallet we support
  const { publicKey } = useWallet()
  const isOwner = publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false
  const [creating, setCreating] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data)
          console.log('Products', data)
        })
    }
  }, [publicKey])

  const renderNotConnectedContainer = () => (
    <div>
      <img src='https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif' alt='emoji' />

      <div className='button-container'>
        <WalletMultiButton className='cta-button connect-wallet-button' />
      </div>
    </div>
  )

  const renderItemBuyContainer = () => (
    <div className='popular-items'>
      <div className='genre-menu'>
        <div className='title'>Popular Items </div>
        <div className='genres'> Tag | Tag | Tag</div>
      </div>
      <div className='row item-cards'>
        {products.map(product => (
          <div className='col-sm-4' key={product.id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className='store'>
      <div className='navigation'>
        <div className='browse-group'>
          <div className='browse'>Browse </div>
          <div className='search-bar'>
            <i className='fas fa-search icons'></i>
            <input className='search-input' type='input' placeholder='Search ... ' />
          </div>
        </div>

        <div className='title-group'>
          <div className='title'>
            Awesome<span> Store</span>
          </div>
        </div>
        <div className='user'>
          <div className='user-profile'>
            <img src='https://randomuser.me/api/portraits/men/22.jpg' className='profile' alt='active user' />
          </div>
          <div className='menu'>
            {isOwner && (
              <button className='create-product-button' onClick={() => setCreating(!creating)}>
                {creating ? 'Close' : 'Create Product'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* We only render the connect button if public key doesn't exist */}
      {creating && <CreateProduct />}
      {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
    </div>
  )
}

export default Body
