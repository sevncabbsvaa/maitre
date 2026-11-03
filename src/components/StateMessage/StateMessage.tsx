
import { AlertIcon, EmptyIcon } from '../Icons/Icons'
import type { StateMessageProps } from './types'

export function StateMessage({
  variant,
  title,
  description,
  action,
}: StateMessageProps) {
  const isError = variant === 'error'

  return (
    <div className="mt-8 flex flex-col items-center gap-2 rounded-(--radius-card) border border-(--line) bg-(--card) px-6 py-18 text-center max-[720px]:px-4 max-[720px]:py-12">
      <div
        className={`mb-2 grid size-16 place-items-center rounded-full ${
          isError
            ? 'bg-(--error-bg) text-(--error)'
            : 'bg-(--chip-bg) text-(--primary)'
        }`}
      >
        {isError ? <AlertIcon /> : <EmptyIcon />}
      </div>

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mb-4 max-w-105 text-(--text-muted)">
        {description}
      </p>

      {action}
    </div>
  )
}
