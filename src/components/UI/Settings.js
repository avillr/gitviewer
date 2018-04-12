import React from 'react'

import cog from '../../assets/cog.svg'

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      toggled: false
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    this.setState({ toggled: !this.state.toggled })
  }

  render () {
    return (
      <div className='Settings' onClick={this.handleToggle}>
        <img alt='settings' className='cog' src={cog} />
      </div>
    )
  }
}

export default Settings
