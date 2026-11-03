
import type { SelectProps } from './types'
import { ChevronDownIcon } from '../Icons/Icons'

export function Select({ children, hasError, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`input w-full appearance-none pr-11 cursor-pointer ${
          hasError ? 'input--error' : ''
        }`}
        {...rest}
      >
        {children}
      </select>

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <ChevronDownIcon />
      </span>
    </div>
  )
}
