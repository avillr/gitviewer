import React from 'react'
import firebase from 'firebase'

const provider = new firebase.auth.GithubAuthProvider()
provider.addScope('repo')
const attemptSignIn = () => {
  firebase.auth().signInWithRedirect(provider)
}

const SearchInput = ({ user, handleSubmit }) => {
  return (
    <form style={{ marginBottom: '5px' }} onSubmit={handleSubmit}>
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
            <a className='button is-light is-outlined' onClick={attemptSignIn}>
              Sign in to unlock full search
            </a>
          </div>
        </div>
      )}
    </form>
  )
}

export default SearchInput
