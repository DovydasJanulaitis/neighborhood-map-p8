import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'

class FilterLocations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  updateQuery = (query) => {
    this.setState({
      query
    })
  }


  render () {
    const { query } = this.state
    const { museumsList } = this.props

    let filteredMuseums

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredMuseums = museumsList.filter(location =>
        match.test(location.title)
      )
    } else {
      filteredMuseums = museumsList
    }


    return (
      <div className="list-box">
        <form
          className="list-form"
          onSubmit={(event) => event.preventDefault()}
          >
          <button className="list-btn">Search</button>
          <input
            className="list-input"
            type="text"
            placeholder="Filter Locations..."
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
        </form>
        <ul className="locations-list">
          {filteredMuseums.map(museum => (
              <li
                className="location-item"
                key={museum.key}
              >
                {museum.title}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default FilterLocations
