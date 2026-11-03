import type { SVGProps } from 'react'

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  }

export const SearchIcon = () => (
  <svg {...base}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const ChevronDownIcon = () => (
  <svg {...base} width={18} height={18}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ChevronLeftIcon = () => (
  <svg {...base} width={16} height={16}>
    <path d="m15 6-6 6 6 6" />
  </svg>
)

export const ChevronRightIcon = () => (
  <svg {...base} width={16} height={16}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const PlusIcon = () => (
  <svg {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const CloseIcon = () => (
  <svg {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const AlertIcon = () => (
  <svg {...base} width={32} height={32} strokeWidth={1.6}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5h.01" />
  </svg>
)

export const EmptyIcon = () => (
  <svg {...base} width={32} height={32} strokeWidth={1.6}>
    <path d="M4 9h16l-1.5 9a2 2 0 0 1-2 1.7h-9a2 2 0 0 1-2-1.7L4 9Z" />
    <path d="M8 9a4 4 0 0 1 8 0" />
  </svg>
)
