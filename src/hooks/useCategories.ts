import { useCallback, useEffect, useState } from 'react'
import { getCategories, type Category } from '../api'

interface State {
  attempt: number
  categories: Category[] | null
  error: string | null
}

export function useCategories() {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<State>({ attempt: -1, categories: null, error: null })

  useEffect(() => {
    let ignore = false
    getCategories()
      .then((categories) => {
        if (!ignore) setState({ attempt, categories, error: null })
      })
      .catch((e: unknown) => {
        if (!ignore) setState({ attempt, categories: null, error: e instanceof Error ? e.message : 'Naməlum xəta baş verdi.' })
      })
    return () => {
      ignore = true
    }
  }, [attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])
  const settled = state.attempt === attempt

  return {
    categories: state.categories,
    error: settled ? state.error : null,
    loading: !settled && state.categories === null,
    retry,
  }
}
