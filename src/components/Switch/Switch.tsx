
import type { SwitchProps } from './types'

export function Switch({ checked, onChange, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-10 shrink-0 cursor-pointer rounded-(--radius-pill) border-0 p-0 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
        checked ? 'bg-(--success)' : 'bg-(--switch-off)'
      }`}
    >
      <span
        className={`absolute left-0.75 top-0.75 size-4.5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-transform duration-200 ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
