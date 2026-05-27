export default function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  fullWidth = false,
  type = 'button',
  children,
}) {
  const base =
    'inline-flex items-center justify-center font-medium transition-all duration-200 ease cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none'

  const sizes = {
    md: 'px-5 py-2.5 text-[15px] rounded-input',
    sm: 'px-3.5 py-1.5 text-[13px] rounded-input',
  }

  const variants = {
    primary: 'bg-accent text-white hover:bg-[#0066CC] active:bg-[#005CB8]',
    ghost: 'bg-transparent text-accent hover:bg-accent/10 active:bg-accent/20',
    danger: 'bg-danger text-white hover:bg-[#E0352A] active:bg-[#CC3026]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[base, sizes[size], variants[variant], fullWidth && 'w-full']
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  )
}
