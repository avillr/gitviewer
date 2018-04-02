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
        <img className='cog' src={cog} />
      </div>
    )
  }
}

export default Settings

// <div className='field is-horizontal'>
//             <div className='field-label'>
//               <label className='label' style={{ color: 'grey' }}>
//                 Theme:
//               </label>
//             </div>
//             <div className='control'>
//               <select
//                 className='select'
//                 value={this.state.currentStyle.name}
//                 onChange={this.handleChange}
//               >
//                 {this.state.styles.map(style => (
//                   <option key={style.name} value={style.name}>
//                     {style.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className='field-label'>
//               <label className='label' style={{ color: 'grey' }}>
//                 Line Numbers:
//               </label>
//             </div>
//             <div className='control'>
//               <label className='checkbox'>
//                 <input
//                   name='lineNumbers'
//                   type='checkbox'
//                   checked={this.state.lineNumbers}
//                   onChange={this.handleLineChange}
//                 />
//               </label>
//             </div>
//           </div>
