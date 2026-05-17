import React from 'react'
import useInView from '../hooks/useInView'
import SectionTitle from './SectionTitle'
import PROJECTS from '../data/projects'
import '../styles/projects.css'
import '../styles/components.css'

export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <SectionTitle title="My Projects" sub="Things I've built" />

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className="project-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              {/* Project Image */}
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              </div>

              {/* Body */}
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>

                <div className="project-tags">
                  {project.tech.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a href={project.demo} className="project-btn-demo" target="_blank" rel="noreferrer">Live Demo</a>
                  <a href={project.github} className="project-btn-github" target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}