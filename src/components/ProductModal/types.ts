import type { Category, Product } from '../../api'

export interface ProductModalProps {
  product: Product | null // null = create
  categories: Category[]
  onClose: () => void
  onSaved: (product: Product, mode: 'created' | 'updated') => void
}
