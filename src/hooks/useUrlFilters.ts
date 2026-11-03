import { useCallback, useMemo, useSyncExternalStore } from 'react'

export interface Filters {
  q: string
  categoryId: number | undefined
  page: number
}

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('popstate', listener) 
  return () => {
    listeners.delete(listener)
    window.removeEventListener('popstate', listener)
  }
}

const getSnapshot = () => window.location.search

function parse(search: string): Filters {
  const params = new URLSearchParams(search)
  const category = Number.parseInt(params.get('category') ?? '', 10)
  const page = Number.parseInt(params.get('page') ?? '', 10)
  return {
    q: params.get('q')?.trim() ?? '',
    categoryId: Number.isInteger(category) && category > 0 ? category : undefined,
    page: Number.isInteger(page) && page > 0 ? page : 1,
  }
}

function toSearch({ q, categoryId, page }: Filters): string {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (categoryId !== undefined) params.set('category', String(categoryId))
  if (page > 1) params.set('page', String(page))
  const text = params.toString()
  return text ? `?${text}` : ''
}

export function useUrlFilters() {
  const search = useSyncExternalStore(subscribe, getSnapshot)
  const filters = useMemo(() => parse(search), [search])

  const setFilters = useCallback((patch: Partial<Filters>, options: { replace?: boolean } = {}) => {
    const next = { ...parse(window.location.search), ...patch }
    const url = `${window.location.pathname}${toSearch(next)}`
    if (url === `${window.location.pathname}${window.location.search}`) return
    window.history[options.replace ? 'replaceState' : 'pushState'](null, '', url)
    listeners.forEach((listener) => listener())
  }, [])

  return [filters, setFilters] as const
}
