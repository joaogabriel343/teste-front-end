import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../utils/prefersReducedMotion'

type ScrollDirection = 'previous' | 'next'

export function useCarousel<TrackElement extends HTMLElement>(itemCount: number) {
  const trackRef = useRef<TrackElement>(null)
  const [canScrollPrevious, setCanScrollPrevious] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const maxScrollLeft = track.scrollWidth - track.clientWidth
    setCanScrollPrevious(track.scrollLeft > 1)
    setCanScrollNext(track.scrollLeft < maxScrollLeft - 1)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    updateScrollState()
    track.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [itemCount, updateScrollState])

  const scrollByPage = useCallback((direction: ScrollDirection) => {
    const track = trackRef.current
    if (!track) return

    const distance = direction === 'next' ? track.clientWidth : -track.clientWidth
    track.scrollBy({ left: distance, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [])

  return { trackRef, canScrollPrevious, canScrollNext, scrollByPage }
}
