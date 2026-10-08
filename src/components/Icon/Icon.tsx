import { ICON_PATHS, type IconName } from './iconPaths'

interface IconProps {
  name: IconName
  size?: number
  strokeWidth?: number
  filled?: boolean
  className?: string
}

export function Icon({ name, size = 24, strokeWidth = 1.75, filled = false, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  )
}
