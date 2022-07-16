import React from 'react'
import Body from '../components/Body'
import HeadComponent from '../components/Head'

// Constants
const TWITTER_HANDLE = '_buildspace'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`

const App = () => {
  return (
    <div className='App'>
      <HeadComponent />
      <Body />
    </div>
  )
}

export default App
