import { parsePriceInput } from './format'

export interface ProductFormValues {
  nameAz: string
  nameEn: string
  categoryId: string 
  price: string 
  isAvailable: boolean
}

export type ProductFormErrors = Partial<Record<'nameAz' | 'categoryId' | 'price', string>>

export function validateProductForm(values: ProductFormValues): ProductFormErrors {
  const errors: ProductFormErrors = {}

  if (!values.nameAz.trim()) errors.nameAz = 'Azərbaycan dilində ad məcburidir.'
  if (!values.categoryId) errors.categoryId = 'Kateqoriya seçin.'

  const price = parsePriceInput(values.price)
  if (Number.isNaN(price) || price <= 0) errors.price = 'Qiymət 0-dan böyük olmalıdır.'

  return errors
}
