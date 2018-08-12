import React, { Component } from 'react';
import './App.css';
import * as museumLocations from './museumLocations.json'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.initMap = this.initMap;
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyC_1Tld98WMbrkNnya8pUwW97QJ6581Jbw&callback=initMap');
  }

  initMap() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {
        lat: 41.878113,
        lng: -87.629799
      }
    });
  }


  render() {
    return (
      <div className="App">
        <div id='map'>
        </div>
      </div>
    );
  }
}

export default App;

function loadJS(src) {
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
  script.onerror = function () {
    document.write('Google Maps Could not Load. Try Again')
  };
}
