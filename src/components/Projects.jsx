import React, { useState, useMemo } from 'react'
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
  const [selectedTechTag, setSelectedTechTag] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  // Toast feedback handler
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 2500)
  }

  // Copy link handler
  const handleCopyLink = (e, url, title) => {
    e.stopPropagation()
    const targetUrl = url && url !== '#' ? url : window.location.href
    navigator.clipboard.writeText(targetUrl).then(() => {
      triggerToast(`Link copied for ${title}!`)
    }).catch(() => {
      triggerToast('Failed to copy link')
    })
  }

  // Filtered Projects computation
  const filtered = useMemo(() => {
    let list = [...PROJECTS]

    // Category filter
    if (active !== 'All') {
      list = list.filter((p) => p.category === active)
    }

    // Tech Tag filter
    if (selectedTechTag) {
      list = list.filter((p) =>
        p.tech.some((t) => t.toLowerCase() === selectedTechTag.toLowerCase())
      )
    }

    return list
  }, [active, selectedTechTag])

  const isFiltered = active !== 'All' || selectedTechTag !== ''

  const handleResetFilters = () => {
    setActive('All')
    setSelectedTechTag('')
  }

  return (
    <section id="projects" className="projects-section" ref={ref}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="projects-toast" role="status" aria-live="polite">
          <span>✨ {toastMessage}</span>
        </div>
      )}

      <div className="container">
        <SectionTitle title="My Projects" sub="Things I've built" />

        {/* ── Filter Tabs ── */}
        <div className="projects-filter" role="tablist" aria-label="Filter projects by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
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

        {/* Active Tech Tag Bar */}
        {selectedTechTag && (
          <div className="active-tag-filter-bar">
            <span>Filtering by tag: <strong>{selectedTechTag}</strong></span>
            <button
              className="remove-tag-filter-btn"
              onClick={() => setSelectedTechTag('')}
              title="Remove tag filter"
            >
              ✕ Remove Tag Filter
            </button>
          </div>
        )}

        {/* ── Results Status Bar ── */}
        <div className="projects-status-bar">
          <span className="projects-count-summary">
            Showing <strong>{filtered.length}</strong> of <strong>{PROJECTS.length}</strong> projects
          </span>
          {isFiltered && (
            <button
              className="projects-reset-btn"
              onClick={handleResetFilters}
            >
              🔄 Reset Filters
            </button>
          )}
        </div>

        {/* ── Grid ── */}
        <div className="projects-grid">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.55s ease ${i * 0.08}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
              }}
              tabIndex={0}
              role="article"
              aria-label={project.title}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedProject(project)
                }
              }}
            >
              {/* Featured Ribbon */}
              {project.featured && (
                <div className="project-featured-badge" title="Featured Flagship Project">
                  ⭐ Featured
                </div>
              )}

              {/* Category badge */}
              <div className="project-category-badge">
                {CATEGORY_ICONS[project.category]} {project.category}
              </div>

              {/* Project Image */}
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.category} Project by Huzaifa Mumtaz`}
                  className="project-image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="project-image-overlay">
                  <button
                    className="project-quick-view-btn"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Quick view details for ${project.title}`}
                  >
                    👁️ Quick View
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="project-body">
                <div className="project-header-row">
                  <h3 className="project-title">{project.title}</h3>
                  <button
                    className="project-share-btn"
                    onClick={(e) => handleCopyLink(e, project.github, project.title)}
                    title="Copy GitHub Link"
                    aria-label={`Copy link for ${project.title}`}
                  >
                    🔗
                  </button>
                </div>

                <p className="project-desc">{project.desc}</p>

                <div className="project-tags">
                  {project.tech.map((t) => (
                    <button
                      key={t}
                      className={`tech-tag ${selectedTechTag.toLowerCase() === t.toLowerCase() ? 'tech-tag--active' : ''}`}
                      onClick={() => setSelectedTechTag(selectedTechTag.toLowerCase() === t.toLowerCase() ? '' : t)}
                      title={`Filter by ${t}`}
                    >
                      {t}
                    </button>
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
            <div className="empty-icon">🔎</div>
            <p className="empty-title">No projects match your search criteria</p>
            <p className="empty-subtitle">Try adjusting your keyword search or clearing active filters.</p>
            <button className="projects-reset-btn empty-reset-btn" onClick={handleResetFilters}>
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* ── Project Quick View Modal ── */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="modal-image-wrapper">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} - ${selectedProject.category} Showcase by Huzaifa Mumtaz`}
                className="modal-image"
              />
              <div className="modal-category-badge">
                {CATEGORY_ICONS[selectedProject.category]} {selectedProject.category}
              </div>
              {selectedProject.featured && (
                <div className="modal-featured-badge">⭐ Featured Project</div>
              )}
            </div>

            <div className="modal-body">
              <h2 id="modal-title" className="modal-title">{selectedProject.title}</h2>
              <p className="modal-desc">{selectedProject.desc}</p>

              <div className="modal-tech-section">
                <h4>Technologies Used</h4>
                <div className="project-tags">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="tech-tag modal-tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                {selectedProject.demo && selectedProject.demo !== '#' && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn-demo modal-btn"
                  >
                    🚀 Launch Live Demo
                  </a>
                )}
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn-github modal-btn"
                >
                  💻 View Source Code on GitHub
                </a>
                <button
                  className="modal-share-btn"
                  onClick={(e) => handleCopyLink(e, selectedProject.github, selectedProject.title)}
                >
                  📋 Copy Repo Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}