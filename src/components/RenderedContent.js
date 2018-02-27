import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { tomorrow } from 'react-syntax-highlighter/styles/prism'
import marked from 'marked'

export default ({ contents, language }) => {
  if (language === 'markdown') {
    return (
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: marked(contents) }}
      />
    )
  } else if (language === 'image') {
    console.log('contents', contents)
    contents = 'data:image/jpeg;base64,' + contents
    return (
      <div>
        <img alt="repo file" src={contents} />
      </div>
    )
  } else {
    return (
      <SyntaxHighlighter language={language} style={tomorrow}>
        {contents}
      </SyntaxHighlighter>
    )
  }
}
