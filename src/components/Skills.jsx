import React from 'react'
import useInView from '../hooks/useInView'
import SectionTitle from './SectionTitle'
import SKILLS from '../data/skills'
import '../styles/skills.css'

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <SectionTitle title="Tech Stack" sub="Technologies I work with" />

        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              className="skill-card"
              style={{
                opacity:   inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
              }}
            >
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.name}</span>
              {/* Coloured glow on hover */}
              <div className="skill-glow" style={{ background: skill.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}