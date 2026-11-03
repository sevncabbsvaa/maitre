
import { formatPrice } from '../../lib/format'
import { Button } from '../Button/Button'
import { Switch } from '../Switch/Switch'
import type { ProductTableProps } from './types'

function TableHead() {
  return (
    <div className="grid h-12 grid-cols-[minmax(160px,1.7fr)_minmax(140px,1.1fr)_100px_minmax(170px,1fr)_72px] items-center gap-x-6 bg-(--bg) px-6 text-xs font-semibold uppercase tracking-[0.06em] text-(--text-muted) [font-family:var(--font-label)] max-[720px]:hidden">
      <span>Ad</span>
      <span>Kateqoriya</span>
      <span className="text-right">Qiymət</span>
      <span className="pl-6">Status</span>
      <span></span>
    </div>
  )
}

export function ProductTable({
  products,
  categories,
  pendingIds,
  dimmed,
  onToggle,
  onEdit,
}: ProductTableProps) {
  const categoryName = (id: number) =>
    categories.find((c) => c.id === id)?.name ?? '—'

  return (
    <div
      className={`mt-8 overflow-hidden rounded-(--radius-card) border border-(--line) bg-(--card) transition-opacity duration-150 max-[720px]:mt-6 ${
        dimmed ? 'pointer-events-none opacity-55' : ''
      }`}
    >
      <TableHead />

      {products.map((product) => {
        const name = product.nameAz

        return (
          <div
            key={product.id}
            className={`grid min-h-16 grid-cols-[minmax(160px,1.7fr)_minmax(140px,1.1fr)_100px_minmax(170px,1fr)_72px] items-center gap-x-6 border-t border-(--line) px-6 max-[720px]:grid-cols-[minmax(0,1fr)_auto] max-[720px]:grid-areas-['name_actions','category_price','status_status'] max-[720px]:gap-y-3 max-[720px]:p-4 ${
              !product.isAvailable ? '[&_.product-name]:text-(--text-muted) [&_.cell--price]:text-(--text-muted) [&_.status-label]:text-(--text-muted) [&_.chip]:border-(--line) [&_.chip]:bg-(--card) [&_.chip]:text-(--text-muted)' : ''
            }`}
          >
            <div className="cell--name min-w-0 max-[720px]:[grid-area:name]">
              <div className="product-name overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                {name}
              </div>
              <div className="product-name-en mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-(--text-muted)">
                {product.nameEn ?? '—'}
              </div>
            </div>

            <div className="cell--category max-[720px]:[grid-area:category]">
              <span className="chip inline-block whitespace-nowrap rounded-(--radius-pill) border border-(--chip-bg) bg-(--chip-bg) px-3 py-0.75 text-sm">
                {categoryName(product.categoryId)}
              </span>
            </div>

            <div className="cell--price text-right max-[720px]:[grid-area:price]">
              {formatPrice(product.price)}
            </div>

            <div className="cell--status flex items-center gap-3 pl-6 text-[15px] max-[720px]:[grid-area:status] max-[720px]:pl-0">
              <Switch
                checked={product.isAvailable}
                disabled={pendingIds.has(product.id)}
                onChange={() => onToggle(product)}
              />
              <span className="status-label">
                {product.isAvailable ? 'Satışda' : 'Satışda deyil'}
              </span>
            </div>

            <div className="cell--actions flex justify-end max-[720px]:[grid-area:actions] max-[720px]:self-start">
              <Button
                variant="outline"
                size="small"
                onClick={() => onEdit(product)}
              >
                Düzəlt
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ProductTableSkeleton({
  rows = 10,
}: {
  rows?: number
}) {
  const skeletonClass =
    'block animate-[shimmer_1.4s_infinite_linear] rounded-[6px] bg-[linear-gradient(90deg,#efebe3_25%,#f7f4ee_50%,#efebe3_75%)] bg-[length:200%_100%]'

  return (
    <div className="mt-8 overflow-hidden rounded-(--radius-card) border border-(--line) bg-(--card) max-[720px]:mt-6">
      <TableHead />

      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="grid min-h-16 grid-cols-[minmax(160px,1.7fr)_minmax(140px,1.1fr)_100px_minmax(170px,1fr)_72px] items-center gap-x-6 border-t border-(--line) px-6 max-[720px]:grid-cols-[minmax(0,1fr)_auto] max-[720px]:gap-y-3 max-[720px]:p-4"
        >
          <div className="cell--name min-w-0">
            <span
              className={skeletonClass}
              style={{
                width: `${45 + ((i * 17) % 35)}%`,
                height: 16,
              }}
            />
            <span
              className={`${skeletonClass} mt-2`}
              style={{
                width: `${30 + ((i * 11) % 30)}%`,
                height: 12,
              }}
            />
          </div>

          <div className="cell--category">
            <span
              className={`${skeletonClass} rounded-full`}
              style={{ width: 96, height: 24 }}
            />
          </div>

          <div className="cell--price text-right">
            <span
              className={skeletonClass}
              style={{ width: 56, height: 16 }}
            />
          </div>

          <div className="cell--status flex items-center gap-3 pl-6 max-[720px]:pl-0">
            <span
              className={`${skeletonClass} rounded-full`}
              style={{ width: 40, height: 24 }}
            />
            <span
              className={skeletonClass}
              style={{ width: 64, height: 14 }}
            />
          </div>

          <div className="cell--actions flex justify-end">
            <span
              className={`${skeletonClass} rounded-full`}
              style={{ width: 72, height: 36 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
