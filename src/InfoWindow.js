import React from 'react'

function InfoWindow(props) {
  const { currentMarker, wikiContent } = props

  return (
    <div className="info-window-box">
      <h2>
        {currentMarker.title}
      </h2>
      <div>
        {wikiContent}
      </div>
    </div>
  )
}

export default InfoWindow
