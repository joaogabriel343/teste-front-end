export type RouteParams = Record<string, string>

export function matchPath(pattern: string, pathname: string): RouteParams | null {
  const patternSegments = pattern.split('/').filter(Boolean)
  const pathSegments = pathname.split('/').filter(Boolean)

  if (patternSegments.length !== pathSegments.length) return null

  const params: RouteParams = {}

  for (const [index, patternSegment] of patternSegments.entries()) {
    const pathSegment = decodeURIComponent(pathSegments[index])

    if (patternSegment.startsWith(':')) {
      params[patternSegment.slice(1)] = pathSegment
    } else if (patternSegment !== pathSegment) {
      return null
    }
  }

  return params
}
