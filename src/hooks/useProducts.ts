import { useEffect, useState } from 'react'
import { getProducts, type Product } from '../api'

export const PAGE_SIZE = 10

export function useProducts(q: string, categoryId: number | undefined, page: number, createdIds: number[]) {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let ignore = false 

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const result = await getProducts({ search: q || undefined, categoryId, pageSize: 1000 })
        if (!ignore) setProducts(result.items)
      } catch (e) {
        if (!ignore) setError(e instanceof Error ? e.message : 'Naməlum xəta baş verdi.')
      }
      if (!ignore) setLoading(false)
    }

    load()
    return () => {
      ignore = true
    }
  }, [q, categoryId, reloadCount])

  function reload() {
    setReloadCount(reloadCount + 1)
  }

  function patchItem(id: number, changes: Partial<Product>) {
    setProducts((old) => old && old.map((p) => (p.id === id ? { ...p, ...changes } : p)))
  }

  let data = null
  if (products) {
    const created = createdIds.map((id) => products.find((p) => p.id === id)).filter((p) => p !== undefined)
    const others = products.filter((p) => !createdIds.includes(p.id))
    const all = [...created, ...others]
    const start = (page - 1) * PAGE_SIZE
    data = { items: all.slice(start, start + PAGE_SIZE), total: all.length }
  }

  return { data, loading, error, reload, patchItem }
}
