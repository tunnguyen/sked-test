import React, { useState, useEffect } from 'react'

export const SectionColumns = (props) => {
  const [style, setStyle] = useState({})

  useEffect(() => {
    const $headerSection = document.querySelector('.section-header')
    const headerSectionHeight = $headerSection.clientHeight
    const style = { height: `calc(100% - ${ headerSectionHeight }px)` }
    setStyle(style)
  }, [])
  
  return <div className="section-columns" style={ style }>
    { props.children }
  </div>
}

export const Column = ({ width, background, children }) => (
  <div className="column" style={{ width, background }}>{ children }</div>
)