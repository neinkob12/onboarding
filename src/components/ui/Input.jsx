export default function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  helper,
  error,
  disabled = false,
  name,
  autoComplete,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[14px] font-medium text-text-primary">{label}</label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={[
          'w-full px-3.5 py-2.5 text-[15px] rounded-input border bg-white',
          'text-text-primary placeholder:text-text-secondary',
          'outline-none transition-all duration-200',
          'focus:border-accent focus:ring-2 focus:ring-accent/20',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-gray-200',
        ]
          .join(' ')}
      />
      {error && <span className="text-[13px] text-danger">{error}</span>}
      {helper && !error && (
        <span className="text-[13px] text-text-secondary">{helper}</span>
      )}
    </div>
  )
}
