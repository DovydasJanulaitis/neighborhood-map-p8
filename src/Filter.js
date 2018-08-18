import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import * as museumLocations from './museumLocations.json'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      filteredMuseums: museumLocations,
      filteredMarkers: [],
      currentMarker: {},
      listStatus: false
    }
  }

  componentDidMount() {
    this.setState({
      filteredMarkers: this.props.markers
    });
  }

  updateQuery = (query) => {
    this.setState({
      query
    })
    this.handleDisplayedMuseums(query)
  }

  handleDisplayedMuseums = (query) => {
    let controller = this
    let filtMuseums
    let filtMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filtMuseums = this.props.museumsList.filter(museum =>
        match.test(museum.title)
      )
      this.setState({
        filteredMuseums: filtMuseums,
        filteredMarkers: filtMarkers
      })
    } else {
      this.setState({
        filteredMuseums: this.props.museumsList,
        filteredMarkers: this.props.markers
      })
    }

    this.props.markers.map(marker => marker.setVisible(false));
    setTimeout(function () {
      controller.props.markers.map(marker =>
        controller.handleMarkersVisibility(marker))
      }, 1)
    }

    handleMarkersVisibility = (marker) => {
      this.state.filteredMarkers.map(filteredMarker =>
        filteredMarker.id === marker.id && marker.setVisible(true)
      )
    }

    manageClickedMarker = (location) => {
      let controller = this

      this.getCurrentMarker(location)

      setTimeout(function() {
        controller.props.openInfoWindow(
          controller.state.currentMarker
        )
      }, 1)
    }

    getCurrentMarker = (location) => {
      this.state.filteredMarkers.map(filteredMarker =>
        filteredMarker.id === location.key &&
        this.setState({
          currentMarker: filteredMarker
        })
      )
    }

    render () {

      const { query, filteredMuseums, listStatus } = this.state

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
          {
            listStatus &&
            <ul className="locations-list">
              {filteredMuseums.map(museum => (
                <li
                  className="location-item"
                  key={museum.key}
                  onClick={() =>
                    this.manageClickedMarker(museum)
                  }
                  >
                  {museum.title}
                </li>
              ))
            }
          </ul>
        }
      </div>
    )
  }
}

export default Filter
