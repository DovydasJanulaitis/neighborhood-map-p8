import React from 'react'

function InfoWindow(props) {
  const { currentMarker } = props

  return (
    <div className="info-window-box">
      {currentMarker.title}
    </div>
  )
}

export default InfoWindow
