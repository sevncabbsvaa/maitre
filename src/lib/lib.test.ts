import { describe, expect, it } from 'vitest'
import { formatPrice, getPageItems, parsePriceInput, priceToInput } from './format'
import { validateProductForm, type ProductFormValues } from './validation'

describe('formatPrice', () => {
  it('uses a comma and two decimals, like the design', () => {
    expect(formatPrice(4.5)).toBe('4,50 ₼')
    expect(formatPrice(18)).toBe('18,00 ₼')
    expect(formatPrice(3.8)).toBe('3,80 ₼')
  })
  it('groups thousands', () => {
    expect(formatPrice(1234.5)).toBe('1 234,50 ₼')
  })
})

describe('parsePriceInput', () => {
  it('accepts comma and dot', () => {
    expect(parsePriceInput('4,5')).toBe(4.5)
    expect(parsePriceInput(' 4.5 ')).toBe(4.5)
  })
  it('rejects garbage', () => {
    expect(parsePriceInput('abc')).toBeNaN()
    expect(parsePriceInput('1e3')).toBeNaN()
    expect(parsePriceInput('-2')).toBeNaN()
    expect(parsePriceInput('')).toBeNaN()
  })
  it('round-trips with priceToInput', () => {
    expect(parsePriceInput(priceToInput(12.5))).toBe(12.5)
  })
})

describe('getPageItems', () => {
  it('shows everything for few pages', () => {
    expect(getPageItems(1, 3)).toEqual([1, 2, 3])
  })
  it('matches the design for page 1 of 5', () => {
    expect(getPageItems(1, 5)).toEqual([1, 2, 3, 'gap', 5])
  })
  it('collapses the middle for many pages', () => {
    expect(getPageItems(1, 10)).toEqual([1, 2, 3, 'gap', 10])
    expect(getPageItems(5, 10)).toEqual([1, 'gap', 4, 5, 6, 'gap', 10])
    expect(getPageItems(10, 10)).toEqual([1, 'gap', 8, 9, 10])
  })
})

describe('validateProductForm', () => {
  const valid: ProductFormValues = {
    nameAz: 'Plov',
    nameEn: '',
    categoryId: '2',
    price: '12,5',
    isAvailable: true,
  }

  it('passes valid input, English name optional', () => {
    expect(validateProductForm(valid)).toEqual({})
  })
  it('requires Azerbaijani name and category', () => {
    const errors = validateProductForm({ ...valid, nameAz: '   ', categoryId: '' })
    expect(errors.nameAz).toBeDefined()
    expect(errors.categoryId).toBeDefined()
  })
  it('requires price greater than 0', () => {
    expect(validateProductForm({ ...valid, price: '0' }).price).toBeDefined()
    expect(validateProductForm({ ...valid, price: '' }).price).toBeDefined()
    expect(validateProductForm({ ...valid, price: 'abc' }).price).toBeDefined()
  })
})
