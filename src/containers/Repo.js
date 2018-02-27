import React, { Component } from 'react'
import axios from 'axios'

import './Repo.css'
import Tree from './Tree'
import RenderedContent from '../components/RenderedContent'

const getTree = (owner, repo, token, sha) => {
  return axios
    .get(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}?recursive=1&access_token=${token}`
    )
    .then(res => res.data)
    .catch(console.error)
}

const getLatestCommit = (owner, repo, token, path) => {
  return axios
    .get(
      `https://api.github.com/repos/${owner}/${repo}/commits/master?access_token=${token}`
    )
    .then(res => res.data)
    .catch(console.error)
}

const getFileContents = (owner, repo, token, url) => {
  return axios
    .get(`${url}?access_token=${token}`)
    .then(res => res.data.content)
    .catch(console.error)
}

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

export default class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      tree: {},
      language: 'javascript',
      selectedFileContents: ''
    }
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const token = nextProps.user.githubToken
    const { owner, repo } = this.props.match.params
    if (token) {
      // TODO remove this for prod
      getLatestCommit(owner, repo, token)
        .then(commit => getTree(owner, repo, token, commit.sha))
        .then(commitTree => {
          // Initialize tree structure for repo
          let tree = {
            name: repo,
            toggled: 'true',
            children: []
          }
          // Place nodes in right spot on tree
          commitTree.tree.forEach(node => {
            var splitpath = node.path.replace(/^\/|\/$/g, '').split('/')
            // Initialize new node
            let newNode = {
              ...node,
              name: splitpath[splitpath.length - 1]
            }
            if (node.type === 'tree') {
              newNode = {
                ...newNode,
                toggled: false,
                children: []
              }
            }
            // Find right sub folder to push node into
            if (splitpath.length === 1) {
              node.type === 'tree'
                ? tree.children.unshift(newNode)
                : tree.children.push(newNode)
            } else {
              let workingTree = tree
              while (splitpath.length > 1) {
                let name = splitpath.shift()
                let index = workingTree.children.findIndex(
                  el => el.name === name
                )
                workingTree = workingTree.children[index]
              }
              node.type === 'tree'
                ? workingTree.children.unshift(newNode)
                : workingTree.children.push(newNode)
            }
          })
          // Set State with final tree
          this.setState({ tree: tree, loading: false })
        })
    }
  }

  async handleFileSelect(node) {
    if (node.type !== 'blob') return

    const { owner, repo } = this.props.match.params
    const token = this.props.user.githubToken
    const fileLanguage = getFileLanguage(node.name)
    let fileContents = await getFileContents(owner, repo, token, node.url)
    if (fileLanguage !== 'image') fileContents = atob(fileContents)
    this.setState({
      selectedFileContents: fileContents,
      language: fileLanguage
    })
  }

  render() {
    const { owner, repo } = this.props.match.params
    const { language } = this.state
    return (
      <div className="Repo">
        {this.state.loading ? (
          <section className="hero is-large is-dark">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  Loading {owner}'s {repo}...
                </h1>
              </div>
            </div>
          </section>
        ) : (
          <div className="contents">
            <div className="explorer">
              <div className="field has-addons">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Search this repo"
                  />
                </div>
                <div className="control">
                  <a className="button is-light is-outlined">Search</a>
                </div>
              </div>
              <Tree
                data={this.state.tree}
                handleFileSelect={this.handleFileSelect}
              />
            </div>
            <div className="fileviewer">
              <RenderedContent
                language={language}
                contents={this.state.selectedFileContents}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}
