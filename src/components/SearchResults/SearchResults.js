import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import './SearchResults.css'
import Loader from 'UI/Loader'

class SearchResults extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      query: '',
      incomplete_results: false,
      items: [],
      total_count: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.searchGithub = this.searchGithub.bind(this)
  }

  componentDidMount () {
    this.searchGithub(this.props.location.search, this.props.user.githubToken)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.searchGithub(nextProps.location.search, nextProps.user.githubToken)
    }
  }

  searchGithub (searchString, token) {
    let url = `https://api.github.com/search/repositories${searchString}`
    if (token) url += `&access_token=${token}`
    axios
      .get(url)
      .then(res => res.data)
      .then(results => {
        this.setState({ ...results, query: searchString.split('q=')[1], loading: false })
      })
      .catch(console.error)
  }

  handleChange (evt) {
    evt.preventDefault()
    this.props.history.push('/search?q=' + evt.target.search.value)
    this.setState({ query: evt.target.search.value, loading: true })
  }

  render () {
    return (
      <div className='SearchResults container'>
        {this.state.loading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 'calc(100vh - 76px)'
            }}
          >
            <Loader style={{ color: 'grey' }} />
          </div>
        ) : (
          <div className='panel'>
            <p className='panel-heading'>
              Showing {this.state.items.length} of {this.state.total_count}{' '}
              results for '{this.state.query}'
            </p>
            <div className='panel-block'>
              <form
                style={{ display: 'flex', width: '100%' }}
                onSubmit={this.handleChange}
              >
                <span
                  style={{ width: '100%' }}
                  className='control has-icons-left'
                >
                  <input
                    className='input'
                    name='search'
                    type='text'
                    placeholder='search'
                  />
                  <span className='icon is-small is-left'>
                    <i className='fa fa-search' />
                  </span>
                </span>
                <span className='control'>
                  <button type='submit' className='button is-light'>
                    Search
                  </button>
                </span>
              </form>
            </div>
            {this.state.items.map(item => (
              <Link
                to={`/${item.owner.login}/${item.name}`}
                className='panel-block'
                style={{ alignItems: 'baseline' }}
                key={item.id}
              >
                <span className='panel-icon'>
                  <i className='fa fa-code-fork' />
                </span>
                <span style={{ fontSize: '1.25em' }}>{item.name}</span> -{' '}
                {item.owner.login}
                <span style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  {item.stargazers_count}
                  <span className='icon has-text-warning'>
                    <i className='fa fa-star' />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default SearchResults
