import React, { Component } from 'react'
import axios from 'axios'

import './SearchResults.css'

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = { incomplete_results: false, items: [], total_count: 0 }
  }

  componentDidMount() {
    let url = `https://api.github.com/search/repositories${
      this.props.location.search
    }`
    if (this.props.user.githubToken)
      url += `&access_token=${this.props.user.githubToken}`
    axios
      .get(url)
      .then(res => res.data)
      .then(results => {
        this.setState(results)
      })
      .catch(console.error)
  }

  render() {
    return (
      <div className="SearchResults">
        <div>hi</div>
        <ul>
          {this.state.items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default SearchResults
