import React, { Component } from 'react'
import marked from 'marked'
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

export default class RenderedContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lineNumbers: true,
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
    this.handleLineChange = this.handleLineChange.bind(this)
  }

  handleChange (evt) {
    this.setState({
      currentStyle: this.state.styles.find(
        style => style.name === evt.target.value
      )
    })
  }

  handleLineChange (evt) {
    this.setState({ lineNumbers: !this.state.lineNumbers })
  }

  render () {
    let { contents, language } = this.props
    if (!contents) return null
    if (language === 'markdown') {
      return (
        <div
          style={{ margin: '1em' }}
          className='markdown-body'
          dangerouslySetInnerHTML={{ __html: marked(contents) }}
        />
      )
    } else if (language === 'image') {
      contents = 'data:image/jpeg;base64,' + contents
      return (
        <div style={{ margin: '3em' }}>
          <img alt='repo file' src={contents} />
        </div>
      )
    } else {
      return (
        <div style={{ margin: '20px' }}>
          <SyntaxHighlighter
            language={language}
            showLineNumbers={this.state.lineNumbers}
            style={this.state.currentStyle.style}
            customStyle={{
              margin: '0',
              borderRadius: '0.5em',
              border: '1px solid whitesmoke'
            }}
          >
            {contents}
          </SyntaxHighlighter>
        </div>
      )
    }
  }
}
