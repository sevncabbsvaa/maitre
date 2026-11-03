import type { ReactNode } from 'react'

export interface StateMessageProps {
  variant: 'empty' | 'error'
  title: string
  description: string
  action?: ReactNode
}
