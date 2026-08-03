import React, { useState } from 'react'
import useInView from '../hooks/useInView'
import SectionTitle from './SectionTitle'
import PROJECTS from '../data/projects'
import '../styles/projects.css'
import '../styles/components.css'

const CATEGORIES = ['All', 'Web', 'App', 'Game', 'n8n', 'Extension']

const CATEGORY_ICONS = {
  All: '⚡',
  Web: '🌐',
  App: '📱',
  Game: '🎮',
  n8n: '🔗',
  Extension: '🧩',
}

export default function Projects() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <SectionTitle title="My Projects" sub="Things I've built" />

        {/* ── Filter Tabs ── */}
        <div className="projects-filter">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${active === cat ? 'filter-tab--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              <span className="filter-tab-icon">{CATEGORY_ICONS[cat]}</span>
              {cat}
              <span className="filter-tab-count">
                {cat === 'All'
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className="projects-grid">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className="project-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.55s ease ${i * 0.08}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
              }}
            >
              {/* Category badge */}
              <div className="project-category-badge">
                {CATEGORY_ICONS[project.category]} {project.category}
              </div>

              {/* Project Image */}
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Body */}
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>

                <div className="project-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    href={project.demo}
                    className="project-btn-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View live demo of ${project.title}`}
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="project-btn-github"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View ${project.title} on GitHub`}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="projects-empty">
            <p>No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}