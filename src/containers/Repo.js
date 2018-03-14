import React, { Component } from 'react'
import axios from 'axios'

import './Repo.css'
import Tree from './Tree'
import RenderedContent from '../components/RenderedContent'
import Loader from '../components/Loader'
import { getFileLanguage } from '../utils/filename'

export default class Repo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      tree: {},
      language: 'javascript',
      searchResults: [],
      selectedFilePath: '',
      selectedFileContents: ''
    }
    this.getTree = this.getTree.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getLatestCommit = this.getLatestCommit.bind(this)
    this.getFileContents = this.getFileContents.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

  getLatestCommit () {
    const {
      user: { githubToken },
      match: { params: { owner, repo } }
    } = this.props
    let url = `https://api.github.com/repos/${owner}/${repo}/commits/master`
    if (githubToken) url += `?access_token=${githubToken}`
    return axios
      .get(url)
      .then(res => res.data)
      .catch(console.error)
  }

  getTree (sha) {
    const {
      user: { githubToken },
      match: { params: { owner, repo } }
    } = this.props
    let url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`
    if (githubToken) url += `&access_token=${githubToken}`
    return axios
      .get(url)
      .then(res => res.data)
      .catch(console.error)
  }

  getFileContents (url) {
    const { user: { githubToken } } = this.props

    if (githubToken) url += `?access_token=${githubToken}`
    return axios
      .get(url)
      .then(res => res.data.content)
      .catch(console.error)
  }

  async handleFileSelect (node) {
    if (node.type !== 'blob') return
    const fileLanguage = getFileLanguage(node.name)
    let fileContents = await this.getFileContents(node.url)
    if (fileLanguage !== 'image') fileContents = window.atob(fileContents)
    this.setState({
      selectedFileContents: fileContents,
      selectedFilePath: node.path,
      language: fileLanguage
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    const {
      user: { githubToken },
      match: { params: { owner, repo } }
    } = this.props

    console.log(evt.target.input.value)
    const config = {
      headers: { Accept: 'application/vnd.github.v3.text-match+json' }
    }
    let url = `https://api.github.com/search/code?q=${
      evt.target.input.value
    }+repo:${owner}/${repo}`
    if (githubToken) url += `&access_token=${githubToken}`
    axios
      .get(url, config)
      .then(res => res.data)
      .then(results => {
        console.log('Search Results:', results)
        this.setState({ searchResults: results })
      })
  }

  componentDidMount () {
    this.getLatestCommit()
      .then(commit => this.getTree(commit.sha))
      .then(commitTree => {
        // Initialize tree structure for repo
        let tree = {
          name: this.props.match.params.repo,
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

  render () {
    const { user, match: { params: { owner, repo } } } = this.props
    const { language } = this.state
    return (
      <div className='Repo'>
        {this.state.loading ? (
          <section style={{ height: '100%' }} className='hero is-large is-dark'>
            <div className='hero-body'>
              <div className='container'>
                <h1 className='title'>
                  Loading {owner}'s {repo}...
                </h1>
                <Loader />
              </div>
            </div>
          </section>
        ) : (
          <div className='contents'>
            <div className='explorer'>
              <form onSubmit={this.handleSubmit}>
                {user.githubToken ? (
                  <div className='field has-addons'>
                    <div className='control'>
                      <input
                        className='input'
                        name='input'
                        type='text'
                        placeholder='Search this repo'
                      />
                    </div>
                    <div className='control'>
                      <a className='button is-light is-outlined'>Search</a>
                    </div>
                  </div>
                ) : (
                  <div className='field'>
                    <div className='control'>
                      <input
                        disabled
                        className='input'
                        type='text'
                        placeholder='Sign In to unlock full text search'
                      />
                    </div>
                  </div>
                )}
              </form>
              <hr style={{ margin: '1rem 0' }} />
              <Tree
                data={this.state.tree}
                handleFileSelect={this.handleFileSelect}
              />
            </div>
            <div className='fileviewer'>
              <h2 style={{ color: 'gray' }}>
                {this.state.selectedFileContents
                  ? this.state.tree.name + '/' + this.state.selectedFilePath
                  : this.state.tree.name}
              </h2>
              {this.state.selectedFileContents && (
                <RenderedContent
                  language={language}
                  contents={this.state.selectedFileContents}
                />
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}
