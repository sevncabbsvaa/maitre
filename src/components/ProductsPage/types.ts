import type { Product } from '../../api'

export type ModalState = { open: false } | { open: true; product: Product | null }
