import React, { useState, useRef, useEffect } from 'react'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! 👋 I\'m Huzaifa\'s AI assistant. Ask me anything about his work, skills, or projects!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const N8N_WEBHOOK_URL = 'https://huzaifa2510.app.n8n.cloud/webhook/portfolio-chat'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { from: 'bot', text: data.reply || data.message || 'Got it!' }])
    } catch {
      setMessages(prev => [...prev, { from: 'bot', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) sendMessage() }

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 90,
          right: 24,
          zIndex: 9999,
          width: 360,
          height: 500,
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)',
          animation: 'chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>

          {/* Header */}
          <div style={{
            padding: '16px 18px',
            background: 'linear-gradient(135deg, #111111, #1A1A1A)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Avatar */}
              <div style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D6C7B2, #A8A29E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(214,199,178,0.25)',
              }}>
                🤖
              </div>
              <div>
                <div style={{ color: '#F5F1E8', fontSize: '0.88rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
                  AI Assistant
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 6px #4ade80',
                  }} />
                  <span style={{ color: '#6b7280', fontSize: '0.72rem', letterSpacing: '0.03em' }}>Online · Powered by n8n</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                color: '#A8A29E',
                cursor: 'pointer',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = '#F5F1E8'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = '#A8A29E'
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            aria-live="polite"
            aria-label="Chat messages history"
            style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            background: '#0A0A0A',
            scrollbarWidth: 'none',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.from === 'user' ? 'flex-end' : 'flex-start',
                gap: 4,
              }}>
                {/* Label */}
                <span style={{
                  fontSize: '0.65rem',
                  color: '#4b5563',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  paddingLeft: msg.from === 'bot' ? 4 : 0,
                  paddingRight: msg.from === 'user' ? 4 : 0,
                }}>
                  {msg.from === 'user' ? 'You' : 'Assistant'}
                </span>

                {/* Bubble */}
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: msg.from === 'user'
                    ? '14px 14px 2px 14px'
                    : '14px 14px 14px 2px',
                  background: msg.from === 'user'
                    ? 'linear-gradient(135deg, rgba(214,199,178,0.15), rgba(168,162,158,0.1))'
                    : 'rgba(255,255,255,0.04)',
                  border: msg.from === 'user'
                    ? '1px solid rgba(214,199,178,0.2)'
                    : '1px solid rgba(255,255,255,0.07)',
                  color: msg.from === 'user' ? '#F5F1E8' : '#C4C0BA',
                  fontSize: '0.85rem',
                  lineHeight: 1.65,
                  backdropFilter: 'blur(8px)',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <span style={{ fontSize: '0.65rem', color: '#4b5563', letterSpacing: '0.06em', textTransform: 'uppercase', paddingLeft: 4 }}>
                  Assistant
                </span>
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px 14px 14px 2px',
                  display: 'flex',
                  gap: 5,
                  alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#A8A29E',
                      animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length === 1 && (
            <div style={{
              padding: '8px 14px',
              background: '#0A0A0A',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
            }}>
              {['View Projects', 'My Skills', 'Hire Me'].map(s => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s)
                    setTimeout(() => sendMessage(), 50)
                  }}
                  style={{
                    background: 'rgba(214,199,178,0.06)',
                    border: '1px solid rgba(214,199,178,0.15)',
                    borderRadius: 20,
                    padding: '5px 12px',
                    color: '#A8A29E',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(214,199,178,0.12)'
                    e.currentTarget.style.color = '#F5F1E8'
                    e.currentTarget.style.borderColor = 'rgba(214,199,178,0.3)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(214,199,178,0.06)'
                    e.currentTarget.style.color = '#A8A29E'
                    e.currentTarget.style.borderColor = 'rgba(214,199,178,0.15)'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 14px',
            background: '#111111',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            gap: 8,
            alignItems: 'flex-end',
            flexShrink: 0,
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '10px 14px',
                color: '#F5F1E8',
                fontSize: '0.85rem',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s ease',
                lineHeight: 1.4,
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(214,199,178,0.3)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: input.trim()
                  ? 'linear-gradient(135deg, #D6C7B2, #A8A29E)'
                  : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: input.trim() ? '#0A0A0A' : '#4b5563',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                flexShrink: 0,
                transition: 'all 0.25s ease',
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        aria-label={open ? "Close AI Chat Assistant" : "Open AI Chat Assistant"}
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: open
            ? 'rgba(255,255,255,0.08)'
            : 'linear-gradient(135deg, #D6C7B2, #A8A29E)',
          border: open ? '1px solid rgba(255,255,255,0.12)' : 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: open ? 20 : 26,
          boxShadow: open ? 'none' : '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(214,199,178,0.2)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: 'scale(1)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Keyframe styles */}
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0);    opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1;   }
        }
      `}</style>
    </>
  )
}