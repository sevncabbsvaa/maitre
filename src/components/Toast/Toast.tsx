
import { useEffect } from 'react'
import type { ToastProps } from './types'

export function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(onDismiss, 4500)
    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  return (
    <div className="fixed bottom-6 left-1/2 z-10 w-max max-w-[calc(100vw-32px)] -translate-x-1/2">
      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className={`flex animate-[toast-in_0.2s_ease-out] items-center gap-4 rounded-(--radius-pill) px-5 py-3 text-[15px] text-white shadow-[0_8px_24px_rgba(41,32,17,0.18)] ${
            toast.type === 'success'
              ? 'bg-(--success)'
              : 'bg-(--error)'
          }`}
        >
          <span>{toast.text}</span>

          <button
            type="button"
            aria-label="Bildirişi bağla"
            className="shrink-0 border-0 bg-transparent p-0 text-xl leading-none opacity-80 hover:opacity-100"
            onClick={onDismiss}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
