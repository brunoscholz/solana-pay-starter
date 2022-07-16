const Body = () => {
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
            <i className='fas fa-bars icons'></i>
            Menu
          </div>
        </div>
      </div>

      <div className='popular-items'>
        <div className='genre-menu'>
          <div className='title'>Popular Items </div>
          <div className='genres'> Tag | Tag | Tag</div>
        </div>
        <div className='row item-cards'>
          {Array(9)
            .fill()
            .map((item, idx) => {
              return (
                <div className='col-sm-4'>
                  <StoreItem idx={idx} />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Body

const StoreItem = ({ idx }) => {
  return (
    <div className='item-card carousel-cell'>
      <div className='product-photo '>
        <img src={`https://picsum.photos/id/${427+idx}/200/200.jpg`} alt='' className='product ' />
      </div>
      <div className='product-info smaller'>
        <div className='product-title'>{`#${idx+1}`}</div>
        <div className='product-artist'>author</div>
        <div className='product-descript'>description</div>
        <div className='listen yellow'>buy</div>
      </div>
    </div>
  )
}
