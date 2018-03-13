const getFileLanguage = filename => {
  const extension = filename.split('.')[1]
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
    case 'css':
      return 'css'
    case 'c':
      return 'c'
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
    default:
      return 'javascript'
  }
}

module.exports = {getFileLanguage}
