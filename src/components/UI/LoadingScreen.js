import React from 'react'
import Loader from './Loader'

const LoadingScreen = ({ owner, repo }) => {
  return (
    <div className='Repo'>
      <section
        style={{ height: '100%', background: 'rgb(34, 37, 43)' }}
        className='hero is-large is-dark'
      >
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title'>
              Loading {owner}'s {repo}...
            </h1>
            <Loader />
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoadingScreen
