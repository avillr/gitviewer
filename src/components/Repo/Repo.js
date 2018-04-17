import React, { Component } from 'react'
import axios from 'axios'
import SplitPane from 'react-split-pane'
import { Scrollbars } from 'react-custom-scrollbars'

import './Repo.css'
import Tree from 'Tree/Tree'
import RenderedContent from './RenderedContent'
import getFileType from './filename'
import SearchInput from './SearchInput'
import LoadingScreen from '../UI/LoadingScreen'
import Settings from '../UI/Settings'
import logo from '../../assets/gitviewerWhite.svg'

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
    this.parseTree = this.parseTree.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getLatestCommit = this.getLatestCommit.bind(this)
    this.getFileContents = this.getFileContents.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

  getLatestCommit () {
    const {
      user: { githubToken },
      match: {
        params: { owner, repo }
      }
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
      match: {
        params: { owner, repo }
      }
    } = this.props
    let url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`
    if (githubToken) url += `&access_token=${githubToken}`
    return axios
      .get(url)
      .then(res => res.data)
      .catch(console.error)
  }

  getFileContents (url) {
    const {
      user: { githubToken }
    } = this.props
    if (githubToken) url += `?access_token=${githubToken}`
    return axios
      .get(url)
      .then(res => res.data.content)
      .catch(console.error)
  }

  parseTree (commitTree) {
    // Initialize tree structure for repo
    let tree = {
      name: this.props.match.params.repo,
      toggled: 'true',
      children: []
    }
    // first place all folders in right spot
    commitTree.tree.filter(node => node.type === 'tree').forEach(node => {
      let splitpath = node.path.replace(/^\/|\/$/g, '').split('/')
      let newTreeNode = {
        ...node,
        name: splitpath[splitpath.length - 1],
        toggled: false,
        children: []
      }
      if (splitpath.length === 1) {
        tree.children.push(newTreeNode)
      } else {
        let workingTree = tree
        while (splitpath.length > 1) {
          let name = splitpath.shift()
          let index = workingTree.children.findIndex(el => el.name === name)
          workingTree = workingTree.children[index]
        }
        workingTree.children.push(newTreeNode)
      }
    })
    // then place all files in correct folders
    commitTree.tree.filter(node => node.type === 'blob').forEach(node => {
      let splitpath = node.path.replace(/^\/|\/$/g, '').split('/')
      let newFileNode = {
        ...node,
        name: splitpath[splitpath.length - 1]
      }
      if (splitpath.length === 1) {
        tree.children.push(newFileNode)
      } else {
        let workingTree = tree
        while (splitpath.length > 1) {
          let name = splitpath.shift()
          let index = workingTree.children.findIndex(el => el.name === name)
          workingTree = workingTree.children[index]
        }
        workingTree.children.push(newFileNode)
      }
    })
    // then set final tree in state
    this.setState({ tree: tree, loading: false })
  }

  async handleFileSelect (node) {
    if (node.type !== 'blob') return
    const fileLanguage = getFileType(node.name)
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
      match: {
        params: { owner, repo }
      }
    } = this.props
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
        this.setState({ searchResults: results })
      })
  }

  componentDidMount () {
    this.getLatestCommit()
      .then(commit => this.getTree(commit.sha))
      .then(commitTree => this.parseTree(commitTree))
  }

  render () {
    const { language } = this.state
    const {
      user,
      match: {
        params: { owner, repo }
      }
    } = this.props
    if (this.state.loading) return <LoadingScreen owner={owner} repo={repo} />
    return (
      <div className='Repo'>
        <Settings />
        <SplitPane split='vertical' minSize={260}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className='explorer'>
              <div
                onClick={() => this.props.history.push('/')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={logo}
                  alt='gitviewer logo'
                  style={{
                    height: '50px',
                    width: '50px',
                    paddingRight: '10px'
                  }}
                />
                <h1
                  className='subtitle is-3'
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  GitViewer
                </h1>
              </div>
              <SearchInput user={user} />
              <Tree
                data={this.state.tree}
                handleFileSelect={this.handleFileSelect}
              />
            </div>
          </Scrollbars>
          <div className='fileviewer'>
            <SplitPane split='vertical' minSize={900}>
              <Scrollbars style={{ width: '100%', height: '100%' }}>
                <RenderedContent
                  language={language}
                  contents={this.state.selectedFileContents}
                />
              </Scrollbars>
              <div />
            </SplitPane>
          </div>
        </SplitPane>
      </div>
    )
  }
}
