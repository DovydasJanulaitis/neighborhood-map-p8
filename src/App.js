import React, { Component } from 'react'
import './App.css'
import * as museumLocations from './museumLocations.json'
import Filter from './Filter'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mLocations: museumLocations,
      map: '',
      markers: [],
      infoWindown: ''
    }
  }

  componentDidMount() {
    window.initMap = this.initMap
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyC_1Tld98WMbrkNnya8pUwW97QJ6581Jbw&callback=initMap')
  }

  initMap = () => {
    let controller = this
    const { mLocations, markers } = this.state

    let infoWindow = new window.google.maps.InfoWindow()

    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {
        lat: 41.878113,
        lng: -87.629799
      }
    })

    this.setState({
      map,
      infoWindow
    })

    for (let i = 0; i < mLocations.length; i++) {

      let position = mLocations[i].position
      let title = mLocations[i].title
      let id = mLocations[i].key

      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        id: id
      })

      markers.push(marker)

      marker.addListener('click', function () {
        controller.displayInfoWindow(marker)
      })
    }
  }

  displayInfoWindow(marker) {
    const { map, infoWindow } = this.state
    if (infoWindow.marker !== marker) {
      infoWindow.marker = marker
      infoWindow.setContent(`<div>${marker.title}</div>`)
      infoWindow.open(map, marker)
      infoWindow.addListener('closeclick', function () {
        infoWindow.setMarker = null
      })
    }
  }


  render() {
    return (
      <div className="App">
        <Filter
          museumsList={this.state.mLocations}
          markers={this.state.markers}
          />
        <div id='map'>
        </div>
      </div>
    )
  }
}

export default App

function loadJS(src) {
  let ref = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')
  script.src = src
  script.async = true
  ref.parentNode.insertBefore(script, ref)
  script.onerror = function () {
    document.write('Google Maps Could not Load. Try Again')
  }
}
