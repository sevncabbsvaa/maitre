
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { createProduct, updateProduct, type Product } from '../../api'
import { parsePriceInput, priceToInput } from '../../lib/format'
import {
  validateProductForm,
  type ProductFormErrors,
  type ProductFormValues,
} from '../../lib/validation'
import { Button } from '../Button/Button'
import { CloseIcon } from '../Icons/Icons'
import { Input } from '../Input/Input'
import { Select } from '../Select/Select'
import { Switch } from '../Switch/Switch'
import type { ProductModalProps } from './types'

function initialValues(product: Product | null): ProductFormValues {
  return {
    nameAz: product?.nameAz ?? '',
    nameEn: product?.nameEn ?? '',
    categoryId: product ? String(product.categoryId) : '',
    price: product ? priceToInput(product.price) : '',
    isAvailable: product?.isAvailable ?? true,
  }
}

export function ProductModal({
  product,
  categories,
  onClose,
  onSaved,
}: ProductModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [values, setValues] = useState(() => initialValues(product))
  const [errors, setErrors] = useState<ProductFormErrors>({})
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const isEdit = product !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  function setField<K extends keyof ProductFormValues>(
    field: K,
    value: ProductFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }))

    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    setServerError(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (saving) return

    const found = validateProductForm(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      dialogRef.current
        ?.querySelector<HTMLElement>('input.border-[var(--error)]')
        ?.focus()
      return
    }

    const input = {
      nameAz: values.nameAz.trim(),
      nameEn: values.nameEn.trim() || null,
      categoryId: Number(values.categoryId),
      price: parsePriceInput(values.price),
      isAvailable: values.isAvailable,
    }

    setSaving(true)
    setServerError(null)

    try {
      const saved = isEdit
        ? await updateProduct(product.id, input)
        : await createProduct(input)

      onSaved(saved, isEdit ? 'updated' : 'created')
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Naməlum xəta baş verdi.',
      )
      setSaving(false)
    }
  }

  function requestClose() {
    if (!saving) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-[min(520px,calc(100vw-32px))] max-h-[calc(100dvh-32px)] rounded-(--radius-modal) border-0 bg-(--card) p-0 text-(--text) shadow-[0_24px_64px_rgba(41,32,17,0.25)] backdrop:bg-[rgba(41,32,17,0.45)] max-[720px]:m-auto max-[720px]:mt-auto max-[720px]:w-full max-[720px]:max-w-none max-[720px]:max-h-[92dvh] max-[720px]:rounded-b-none"
      onCancel={(e) => {
        e.preventDefault()
        requestClose()
      }}
      onMouseDown={(e) => {
        if (e.target === dialogRef.current) requestClose()
      }}
    >
      <form
        className="flex max-h-inherit flex-col"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-xl font-semibold">
            {isEdit ? 'Məhsulu düzəlt' : 'Yeni məhsul'}
          </h2>

          <Button variant="icon" onClick={requestClose} disabled={saving}>
            <CloseIcon />
          </Button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 overflow-y-auto p-6">
          {serverError && (
            <div className="rounded-xl bg-(--error-bg) px-4 py-3 text-sm text-(--error)">
              {serverError}
            </div>
          )}

          {/* Name AZ */}
          <div>
            <label
              htmlFor="nameAz"
              className="mb-2 block text-sm font-medium"
            >
              Ad (Azərbaycan dilində){' '}
              <span className="text-(--error)">*</span>
            </label>

            <Input
              id="nameAz"
              value={values.nameAz}
              onChange={(e) => setField('nameAz', e.target.value)}
              hasError={!!errors.nameAz}
              autoFocus
              autoComplete="off"
            />

            {errors.nameAz && (
              <p className="mt-1.5 pl-1 text-[13px] text-(--error)">
                {errors.nameAz}
              </p>
            )}
          </div>

          {/* Name EN */}
          <div>
            <label
              htmlFor="nameEn"
              className="mb-2 block text-sm font-medium"
            >
              Ad (ingilis dilində)
            </label>

            <Input
              id="nameEn"
              value={values.nameEn}
              onChange={(e) => setField('nameEn', e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
            <div>
              <label
                htmlFor="categoryId"
                className="mb-2 block text-sm font-medium"
              >
                Kateqoriya{' '}
                <span className="text-(--error)">*</span>
              </label>

              <Select
                id="categoryId"
                value={values.categoryId}
                onChange={(e) => setField('categoryId', e.target.value)}
                hasError={!!errors.categoryId}
              >
                <option value="">Seçin</option>

                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>

              {errors.categoryId && (
                <p className="mt-1.5 pl-1 text-[13px] text-(--error)">
                  {errors.categoryId}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium"
              >
                Qiymət{' '}
                <span className="text-(--error)">*</span>
              </label>

              <Input
                id="price"
                suffix="₼"
                inputMode="decimal"
                placeholder="0,00"
                value={values.price}
                onChange={(e) => setField('price', e.target.value)}
                hasError={!!errors.price}
                autoComplete="off"
              />

              {errors.price && (
                <p className="mt-1.5 pl-1 text-[13px] text-(--error)">
                  {errors.price}
                </p>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3 rounded-(--radius-card) bg-(--bg) px-4 py-3">
            <Switch
              checked={values.isAvailable}
              onChange={(checked) => setField('isAvailable', checked)}
            />

            <div>
              <div className="font-medium">
                {values.isAvailable ? 'Satışda' : 'Satışda deyil'}
              </div>

              <div className="text-[13px] text-(--text-muted)">
                Satışda olmayan məhsul menyuda göstərilmir.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-6 pt-4 max-[720px]:[&>button]:flex-1">
          <Button
            variant="outline"
            onClick={requestClose}
            disabled={saving}
          >
            Ləğv et
          </Button>

          <Button type="submit" disabled={saving}>
            {saving ? 'Saxlanılır...' : 'Yadda saxla'}
          </Button>
        </div>
      </form>
    </dialog>
  )
}
