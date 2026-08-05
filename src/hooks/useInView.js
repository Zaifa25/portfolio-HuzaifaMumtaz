import { useState, useEffect, useRef } from 'react'

export default function useInView(threshold = 0.02) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(ref.current)

    // Immediate check in case already visible in viewport on page load
    const rect = ref.current.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}