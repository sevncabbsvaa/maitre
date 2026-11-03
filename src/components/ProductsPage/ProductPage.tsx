
import { useCallback, useEffect, useState } from 'react'
import { updateProduct, type Product } from '../../api'
import { useCategories } from '../../hooks/useCategories'
import { PAGE_SIZE, useProducts } from '../../hooks/useProducts'
import { useUrlFilters } from '../../hooks/useUrlFilters'
import { Button } from '../Button/Button'
import { PlusIcon } from '../Icons/Icons'
import { Pagination } from '../Pagination/Pagination'
import { ProductModal } from '../ProductModal/ProductModal'
import { ProductTable, ProductTableSkeleton } from '../ProductTable/ProductTable'
import { StateMessage } from '../StateMessage/StateMessage'
import { Toast } from '../Toast/Toast'
import type { ToastMessage } from '../Toast/types'
import { Toolbar } from '../Toolbar/Toolbar'
import type { ModalState } from './types'

export function ProductsPage() {
  const [filters, setFilters] = useUrlFilters()
  const { categories, error: categoriesError, retry: retryCategories } = useCategories()
  const [createdIds, setCreatedIds] = useState<number[]>([])
  const products = useProducts(filters.q, filters.categoryId, filters.page, createdIds)

  const [searchInput, setSearchInput] = useState(filters.q)
  const [seenQ, setSeenQ] = useState(filters.q)
  const [modal, setModal] = useState<ModalState>({ open: false })
  const [pendingIds, setPendingIds] = useState<ReadonlySet<number>>(new Set())
  const [toast, setToast] = useState<ToastMessage | null>(null)

  if (filters.q !== seenQ) {
    setSeenQ(filters.q)
    setSearchInput(filters.q)
  }

  useEffect(() => {
    const next = searchInput.trim()
    if (next === filters.q) return
    const timer = setTimeout(() => setFilters({ q: next, page: 1 }, { replace: true }), 300)
    return () => clearTimeout(timer)
  }, [searchInput, filters.q, setFilters])

  const total = products.data?.total ?? 0
  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE))

  useEffect(() => {
    if (!products.loading && products.data && filters.page > lastPage) {
      setFilters({ page: lastPage }, { replace: true })
    }
  }, [products.loading, products.data, filters.page, lastPage, setFilters])

  const showToast = useCallback((type: ToastMessage['type'], text: string) => {
    setToast({ id: Date.now(), type, text })
  }, [])

  const dismissToast = useCallback(() => setToast(null), [])

  async function handleToggle(product: Product) {
    const next = !product.isAvailable

    setPendingIds((prev) => new Set(prev).add(product.id))
    products.patchItem(product.id, { isAvailable: next })

    try {
      const saved = await updateProduct(product.id, { isAvailable: next })
      products.patchItem(product.id, saved)
    } catch (e) {
      products.patchItem(product.id, { isAvailable: product.isAvailable })
      showToast(
        'error',
        `“${product.nameAz}” statusu dəyişmədi. ${e instanceof Error ? e.message : ''}`.trim(),
      )
    } finally {
      setPendingIds((prev) => {
        const copy = new Set(prev)
        copy.delete(product.id)
        return copy
      })
    }
  }

  function handleSaved(saved: Product, mode: 'created' | 'updated') {
    setModal({ open: false })
    products.reload()

    if (mode === 'created') {
      setCreatedIds((prev) => [saved.id, ...prev])
      setFilters({ q: '', categoryId: undefined, page: 1 })
    }

    showToast(
      'success',
      mode === 'created'
        ? `“${saved.nameAz}” əlavə olundu.`
        : `“${saved.nameAz}” yadda saxlanıldı.`,
    )
  }

  function clearFilters() {
    setFilters({ q: '', categoryId: undefined, page: 1 })
  }

  const hasFilters = filters.q !== '' || filters.categoryId !== undefined
  const loadError = categoriesError ?? products.error

  const retry = () => {
    if (categoriesError) retryCategories()
    if (products.error) products.reload()
  }

  function renderContent() {
    if (loadError) {
      return (
        <StateMessage
          variant="error"
          title="Məhsulları yükləmək mümkün olmadı"
          description={loadError}
          action={<Button onClick={retry}>Yenidən cəhd et</Button>}
        />
      )
    }

    if (!categories || !products.data) {
      return <ProductTableSkeleton rows={PAGE_SIZE} />
    }

    if (products.data.total === 0 && !products.loading) {
      return hasFilters ? (
        <StateMessage
          variant="empty"
          title="Heç nə tapılmadı"
          description="Axtarışa və ya seçilmiş kateqoriyaya uyğun məhsul yoxdur."
          action={
            <Button variant="outline" onClick={clearFilters}>
              Filtrləri təmizlə
            </Button>
          }
        />
      ) : (
        <StateMessage
          variant="empty"
          title="Hələ məhsul yoxdur"
          description="Menyuya ilk məhsulu əlavə edin."
          action={
            <Button onClick={() => setModal({ open: true, product: null })}>
              Yeni məhsul
            </Button>
          }
        />
      )
    }

    return (
      <>
        <ProductTable
          products={products.data.items}
          categories={categories}
          pendingIds={pendingIds}
          dimmed={products.loading}
          onToggle={handleToggle}
          onEdit={(product) => setModal({ open: true, product })}
        />

        <Pagination
          page={filters.page}
          pageSize={PAGE_SIZE}
          total={products.data.total}
          onChange={(page) => setFilters({ page })}
        />
      </>
    )
  }

  const subtitle = products.data
    ? `${hasFilters ? 'Filtrə uyğun' : 'Menyudakı bütün məhsullar'} · ${products.data.total} məhsul`
    : 'Menyudakı bütün məhsullar'

  return (
    <main className="px-(--page-gutter) pt-12 pb-10 max-[720px]:pt-6">
      {/* Page Header */}
      <div className="flex items-end justify-between gap-6 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-4">
        <div>
          <h1 className="text-[38px] leading-[1.15] font-normal tracking-[-0.02em] max-[720px]:text-[30px]">
            Məhsullar
          </h1>

          <p className="mt-2 text-(--text-muted)">
            {subtitle}
          </p>
        </div>

        <Button
          className="max-[720px]:w-full"
          onClick={() => setModal({ open: true, product: null })}
          disabled={!categories}
          title={categories ? undefined : 'Kateqoriyalar yüklənir'}
        >
          <PlusIcon />
          Yeni məhsul
        </Button>
      </div>

      {/* Toolbar */}
      <Toolbar
        search={searchInput}
        onSearchChange={setSearchInput}
        categoryId={filters.categoryId}
        onCategoryChange={(categoryId) => setFilters({ categoryId, page: 1 })}
        categories={categories}
      />

      {/* Content */}
      {renderContent()}

      {/* Product Modal */}
      {modal.open && categories && (
        <ProductModal
          product={modal.product}
          categories={categories}
          onClose={() => setModal({ open: false })}
          onSaved={handleSaved}
        />
      )}

      {/* Toast */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </main>
  )
}
