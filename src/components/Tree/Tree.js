import React, { Component } from 'react'
import { Treebeard } from 'react-treebeard'

class Tree extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cursor: {}
    }
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle (node, toggled) {
    if (this.state.cursor) {
      let oldCursor = this.state.cursor
      oldCursor.active = false
    }
    node.active = true
    if (node.children) {
      node.toggled = toggled
    }
    this.setState({ cursor: node })
    this.props.handleFileSelect(node)
  }

  render () {
    return <Treebeard data={this.props.data || {}} onToggle={this.onToggle} />
  }
}

export default Tree
