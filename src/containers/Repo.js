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

export default class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      tree: {}
    }
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
              tree.children.push(newNode)
            } else {
              let workingTree = tree
              while (splitpath.length > 1) {
                let name = splitpath.shift()
                let index = workingTree.children.findIndex(
                  el => el.name === name
                )
                workingTree = workingTree.children[index]
              }
              workingTree.children.push(newNode)
            }
          })

          // Set State with final tree
          this.setState({ tree: tree, loading: false })
        })
    }
  }

  render() {
    const { owner, repo } = this.props.match.params
    console.log('state', this.state)
    return this.state.loading ? (
      <span>
        we be loading... {owner}'s {repo}!
      </span>
    ) : (
      <div className="Repo">
        <h3>Contents</h3>
        <div className="explorer">
          <div className="root pane">
            <Tree data={this.state.tree} />
          </div>
        </div>
      </div>
    )
  }
}
