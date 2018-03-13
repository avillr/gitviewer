import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import {
  coy,
  dark,
  funky,
  okaidia,
  solarizedlight,
  tomorrow,
  twilight,
  prism,
  atomDark,
  base16AteliersulphurpoolLight,
  cb,
  darcula,
  duotoneDark,
  duotoneEarth,
  duotoneForest,
  duotoneLight,
  duotoneSea,
  duotoneSpace,
  ghcolors,
  hopscotch,
  pojoaque,
  vs,
  xonokai
} from 'react-syntax-highlighter/styles/prism'
import marked from 'marked'

export default class RenderedContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStyle: { name: 'tomorrow', style: tomorrow },
      styles: [
        { name: 'coy', style: coy },
        { name: 'dark', style: dark },
        { name: 'funky', style: funky },
        { name: 'okaidia', style: okaidia },
        { name: 'solarizedlight', style: solarizedlight },
        { name: 'tomorrow', style: tomorrow },
        { name: 'twilight', style: twilight },
        { name: 'prism', style: prism },
        { name: 'atomDark', style: atomDark },
        {
          name: 'base16AteliersulphurpoolLight',
          style: base16AteliersulphurpoolLight
        },
        { name: 'cb', style: cb },
        { name: 'darcula', style: darcula },
        { name: 'duotoneDark', style: duotoneDark },
        { name: 'duotoneEarth', style: duotoneEarth },
        { name: 'duotoneForest', style: duotoneForest },
        { name: 'duotoneLight', style: duotoneLight },
        { name: 'duotoneSea', style: duotoneSea },
        { name: 'duotoneSpace', style: duotoneSpace },
        { name: 'ghcolors', style: ghcolors },
        { name: 'hopscotch', style: hopscotch },
        { name: 'pojoaque', style: pojoaque },
        { name: 'vs', style: vs },
        { name: 'xonokai', style: xonokai }
      ]
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (evt) {
    this.setState({
      currentStyle: this.state.styles.find(
        style => style.name === evt.target.value
      )
    })
  }

  render () {
    let { contents, language } = this.props
    if (language === 'markdown') {
      return (
        <div
          className='markdown-body'
          dangerouslySetInnerHTML={{ __html: marked(contents) }}
        />
      )
    } else if (language === 'image') {
      console.log('contents', contents)
      contents = 'data:image/jpeg;base64,' + contents
      return (
        <div>
          <img alt='repo file' src={contents} />
        </div>
      )
    } else {
      return (
        <div>
          <div className='field is-horizontal'>
            <div className='field-label'>
              <label className='label' style={{color: 'grey'}}>Theme:</label>
            </div>
            <div className='control'>
              <select
                className='select'
                value={this.state.currentStyle.name}
                onChange={this.handleChange}
              >
                {this.state.styles.map(style => (
                  <option key={style.name} value={style.name}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <SyntaxHighlighter
            language={language}
            style={this.state.currentStyle.style}
          >
            {contents}
          </SyntaxHighlighter>
        </div>
      )
    }
  }
}
