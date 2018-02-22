import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { atomDark } from 'react-syntax-highlighter/styles/prism'
import marked from 'marked'

export default ({ contents, language }) => {
  if (language === 'markdown') {
    return (
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: marked(contents) }}
      />
    )
  } else {
    return (
      <SyntaxHighlighter language={language} style={atomDark}>
        {contents}
      </SyntaxHighlighter>
    )
  }
}
