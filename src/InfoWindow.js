import React from 'react'

function InfoWindow(props) {
  const { currentMarker, wikiContent } = props

  return (
    <aside
      className="info-window-box"
      tabIndex='4'
    >
      <h2>
        {currentMarker.title}
      </h2>
      <div>
        {wikiContent}
        <p>Powered by <a href='https://www.wikipedia.org'>Wikipedia</a></p>
      </div>
    </aside>
  )
}

export default InfoWindow
