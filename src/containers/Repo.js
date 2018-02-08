import React, { Component } from 'react'
import axios from 'axios'

import './Repo.css'

const getTree = (owner, repo, token, sha) => {
  return axios
    .get(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}?recursive=1&access_token=${token}`
    )
    .then(res => res.data)
}

const getLatestCommit = (owner, repo, token, path) => {
  return axios
    .get(
      `https://api.github.com/repos/${owner}/${repo}/commits/master?access_token=${token}`
    )
    .then(res => res.data)
}

export default class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contents: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const token = nextProps.user.githubToken
    if (token) {
      const { owner, repo } = this.props.match.params
      getLatestCommit(owner, repo, token)
        .then(commit => getTree(owner, repo, token, commit.sha))
        .then(commitTree => {
          console.log('commitTree:', commitTree)
          this.setState({ contents: commitTree.tree })
        })
    }
  }

  render() {
    const { owner, repo } = this.props.match.params
    return (
      <div className="Repo">
        <h3>
          Owner:{owner} Repo:{repo}
        </h3>
        <h3>Contents</h3>
        <div className="explorer">
          <div className="root pane">
            <ul>
              {this.state.contents.map(item => (
                <li key={item.sha}>{item.path}</li>
              ))}
            </ul>
          </div>
          <div className="first pane">test</div>
        </div>
      </div>
    )
  }
}
