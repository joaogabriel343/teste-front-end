import type { CSSProperties } from 'react'

const STAGGER_STEP_MS = 70
const STAGGER_MAX_STEPS = 6

export function staggerDelay(index: number): CSSProperties {
  return { animationDelay: `${Math.min(index, STAGGER_MAX_STEPS) * STAGGER_STEP_MS}ms` }
}
