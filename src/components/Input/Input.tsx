
import type { InputProps } from './types'

export function Input({
  icon,
  suffix,
  hasError,
  className = '',
  ...rest
}: InputProps) {
  const inputClasses = [
    'h-[var(--control-height)] w-full rounded-full border bg-[var(--card)] px-5 outline-none transition-[border-color,box-shadow] duration-150',
    'placeholder:text-[var(--text-muted)]',
    'hover:border-[#cfcac1]',
    'focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(163,123,62,0.18)]',
    'disabled:opacity-60',
    icon && 'pl-12',
    suffix && 'pr-11',
    hasError
      ? 'border-[var(--error)] focus:border-[var(--error)] focus:shadow-[0_0_0_3px_rgba(154,59,30,0.15)]'
      : 'border-[var(--line)]',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="relative block">
      {icon && (
        <span className="pointer-events-none absolute inset-y-0 left-4.5 flex items-center text-(--text-muted)">
          {icon}
        </span>
      )}

      <input
        className={inputClasses}
        {...rest}
      />

      {suffix && (
        <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-(--text-muted)">
          {suffix}
        </span>
      )}
    </div>
  )
}
