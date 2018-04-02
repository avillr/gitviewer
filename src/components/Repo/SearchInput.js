import React from 'react'

const SearchInput = ({ user }) => {
  return (
    <form onSubmit={this.handleSubmit}>
      {user.githubToken ? (
        <div className='field has-addons'>
          <div className='control'>
            <input
              className='input'
              name='input'
              type='text'
              placeholder='Search this repo'
            />
          </div>
          <div className='control'>
            <a className='button is-light is-outlined'>Search</a>
          </div>
        </div>
      ) : (
        <div className='field'>
          <div className='control'>
            <input
              disabled
              className='input'
              type='text'
              placeholder='Sign In to unlock full text search'
            />
          </div>
        </div>
      )}
    </form>
  )
}

export default SearchInput
