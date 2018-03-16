export default function getFileType (filename) {
  const extension = filename.split('.')[1].toLowerCase()
  switch (extension) {
    case 'js':
      return 'javascript'
    case 'jsx':
      return 'jsx'
    case 'json':
      return 'json'
    case 'go':
      return 'go'
    case 'md':
      return 'markdown'
    case 'py':
      return 'python'
    case 'r':
      return 'r'
    case 'rb':
      return 'ruby'
    case 'rs':
      return 'rust'
    case 're':
      return 'reason'
    case 'css':
      return 'css'
    case 'h':
      return 'c'
    case 'c':
      return 'c'
    case 'coffee':
      return 'coffeescript'
    case 'jpeg':
      return 'image'
    case 'jpg':
      return 'image'
    case 'png':
      return 'image'
    case 'ico':
      return 'image'
    case 'svg':
      return 'svg'
    case 'swift':
      return 'swift'
    case 'ts':
      return 'typescript'
    case 'scss':
      return 'scss'
    case 'less':
      return 'less'
    case 'sql':
      return 'sql'
    case 'styl':
      return 'stylus'
    case 'sass':
      return 'sass'
    case 'php':
      return 'php'
    case 'java':
      return 'java'
    case 'graphql':
      return 'graphql'
    case 'yml':
      return 'yaml'
    default:
      return 'javascript'
  }
}
