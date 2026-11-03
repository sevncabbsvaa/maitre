
import { getPageItems } from '../../lib/format'
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons/Icons'
import type { PaginationProps } from './types'

export function Pagination({
  page,
  pageSize,
  total,
  onChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  const baseButtonStyles =
    'grid min-w-10 h-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--card)] px-2 text-[15px] font-medium hover:enabled:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60 disabled:text-[var(--text-muted)]'

  return (
    <div className="mt-6 flex min-h-10 items-center justify-between gap-4 max-[720px]:flex-col-reverse max-[720px]:items-stretch max-[720px]:text-center">
      <p className="text-[15px] text-(--text-muted)">
        {from}–{to} / {total} məhsul
      </p>

      {totalPages > 1 && (
        <nav className="flex items-center gap-2 max-[720px]:flex-wrap max-[720px]:justify-center">
          <button
            type="button"
            className={baseButtonStyles}
            onClick={() => onChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeftIcon />
          </button>

          {getPageItems(page, totalPages).map((item, i) =>
            item === 'gap' ? (
              <span
                key={`gap-${i}`}
                className="min-w-6 text-center text-(--text-muted)"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className={`${baseButtonStyles} ${
                  item === page
                    ? 'border-(--text) bg-(--text) text-white hover:enabled:border-(--text)'
                    : ''
                }`}
                onClick={() => onChange(item)}
              >
                {item}
              </button>
            ),
          )}

          <button
            type="button"
            className={baseButtonStyles}
            onClick={() => onChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRightIcon />
          </button>
        </nav>
      )}
    </div>
  )
}
