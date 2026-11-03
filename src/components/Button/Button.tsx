
import type { ButtonProps } from './types'

export function Button({
  variant = 'primary',
  size = 'normal',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const baseStyles =
    'inline-flex h-[var(--control-height)] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent px-6 font-medium transition-[background-color,border-color,opacity] duration-150 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-[var(--primary)] text-white hover:enabled:bg-[var(--primary-hover)] disabled:opacity-55',

    outline:
      'border-[var(--line)] bg-[var(--card)] text-[var(--text)] hover:enabled:border-[var(--primary)] disabled:opacity-55',

    icon:
      'size-9 border-0 bg-transparent p-0 text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--text)]',
  }

  const sizes = {
    normal: '',
    small: 'h-9 px-4 text-[15px]',
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...rest}
    />
  )
}
