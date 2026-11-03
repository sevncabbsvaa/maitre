
import { Input } from '../Input/Input'
import { SearchIcon } from '../Icons/Icons'
import { Select } from '../Select/Select'
import type { ToolbarProps } from './types'

export function Toolbar({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  categories,
}: ToolbarProps) {
  return (
    <div className="mt-8 flex gap-3 max-[720px]:mt-6 max-[720px]:flex-col">
      <div className="w-95 max-[720px]:w-full">
        <Input
          type="search"
          icon={<SearchIcon />}
          placeholder="Ada görə axtar..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="w-60 max-[720px]:w-full">
        <Select
          value={categoryId ?? ''}
          disabled={!categories}
          onChange={(e) =>
            onCategoryChange(
              e.target.value ? Number(e.target.value) : undefined,
            )
          }
        >
          <option value="">Bütün kateqoriyalar</option>

          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
