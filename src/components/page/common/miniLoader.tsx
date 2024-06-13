import React from 'react'

const MiniLoader = ({ type = 'warning', size = 100}) => {
  return (
    <div
      className={`spinner-border text-${type}`}
      style={{scale: `${size}%`}}
      role={'status'}
    >
      <span className={'visually-hidden'}>Loading...</span>
    </div>
  )
}

export default MiniLoader
