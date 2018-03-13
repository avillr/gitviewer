import React from 'react'

const Help = props => {
  const issueTitle = 'Check out this error!'
  return (
    <div className='Help'>
      <div className='container'>
        <h1 className='subtitle is-1'>Help</h1>
        <p>
          Sorry something broke, if you make an issue <a href={`https://github.com/alexv/gitviewer/issues/new?title=${issueTitle}`} >here</a> I'll fix it asap!
        </p>
      </div>
    </div>
  )
}

export default Help
