import React, { Component } from 'react'
import axios from 'axios'

import './Repo.css'
import Tree from './Tree'

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
    .get(`${url}?access_token=${token}`, {
      headers: { accept: 'application/vnd.github.VERSION.raw' }
    })
    .then(res => res.data)
    .catch(console.error)
}

export default class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      tree: {},
      selectedFileContents: ''
    }
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const token = nextProps.user.githubToken
    if (token) {
      // TODO remove this for prod
      const { owner, repo } = this.props.match.params
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

    const fileContents = await getFileContents(owner, repo, token, node.url)
    this.setState({ selectedFileContents: fileContents })
  }

  render() {
    const { owner, repo } = this.props.match.params
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
              <Tree
                data={this.state.tree}
                handleFileSelect={this.handleFileSelect}
              />
            </div>
            <div className="fileviewer">{this.state.selectedFileContents}</div>
          </div>
        )}
      </div>
    )
  }
}
