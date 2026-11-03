import type { Category, Product } from '../../api'

export interface ProductTableProps {
  products: Product[]
  categories: Category[]
  pendingIds: ReadonlySet<number>
  dimmed: boolean 
  onToggle: (product: Product) => void
  onEdit: (product: Product) => void
}
