export interface ToastMessage {
  id: number
  type: 'success' | 'error'
  text: string
}

export interface ToastProps {
  toast: ToastMessage | null
  onDismiss: () => void
}
