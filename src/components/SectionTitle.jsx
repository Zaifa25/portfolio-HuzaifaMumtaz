import React from 'react'
import '../styles/components.css'

export default function SectionTitle({ title, sub }) {
  const words = title.split(' ')
  const last  = words.pop()

  return (
    <div className="section-title-wrapper">
      <p className="section-subtitle">{sub}</p>
      <h2 className="section-title">
        {words.join(' ')}{words.length > 0 ? ' ' : ''}
        <span className="accent">{last}</span>
      </h2>
      <div className="section-divider" />
    </div>
  )
}
