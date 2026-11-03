import type { Category } from '../../api'

export interface ToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  categoryId: number | undefined
  onCategoryChange: (id: number | undefined) => void
  categories: Category[] | null
}
