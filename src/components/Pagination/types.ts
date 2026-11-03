export interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onChange: (page: number) => void
}
