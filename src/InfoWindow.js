import React from 'react'

function InfoWindow(props) {
  const { currentMarker, wikiContent } = props

  return (
    <div className="info-window-box">
      {currentMarker.title}
      <div>
        {wikiContent}
      </div>
    </div>
  )
}

export default InfoWindow
