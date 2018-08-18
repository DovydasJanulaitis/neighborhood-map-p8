import React, { Component } from 'react'
import './App.css'
import * as museumLocations from './museumLocations.json'
import Filter from './Filter'
import InfoWindow from './InfoWindow'
import fetchJsonp from 'fetch-jsonp';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mLocations: museumLocations,
      map: '',
      markers: [],
      infoWindowStatus: false,
      currentMarker: {},
      wikiContent: ''
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
      map
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
        controller.openInfoWindow(marker)
      })
    }
    map.addListener('click', function() {
      controller.closeInfoWindow()
    })
  }


  openInfoWindow = (marker) => {
    this.setState({
      infoWindowStatus: true,
      currentMarker: marker
    })
    this.getInfo(marker)
  }

  closeInfoWindow = () => {
    this.setState({
      infoWindowStatus: false,
      currentMarker: {}
    })
  }

  getInfo = (marker) => {

    let controller = this

    let place = marker.title
    let srcUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + place
    srcUrl = srcUrl.replace(/ /g, '%20')

    fetchJsonp(srcUrl)
    .then(function(response) {
      return response.json()
      }).then(function (data) {
        let pages = data.query.pages
        let pageID = Object.keys(data.query.pages)[0]
        let pageContent = pages[pageID].extract

        controller.setState({
          wikiContent: pageContent
        })
      }).catch(function(error) {
        let wikiError = 'Wikipedia page failed to load'
        controller.setState({
          wikiContent: wikiError
        })
      })
    }

    render() {
      return (
        <div className="App">
          <Filter
            museumsList={this.state.mLocations}
            markers={this.state.markers}
            openInfoWindow={this.openInfoWindow}
            />
          {this.state.infoWindowStatus &&
            <InfoWindow
              currentMarker={this.state.currentMarker}
              wikiContent={this.state.wikiContent}
            />
          }
          <div id='map' role='application'>
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
