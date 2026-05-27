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
  prefix,
  suffix,
}) {
  const wrapperClass = [
    'flex items-center rounded-input border bg-white transition-all duration-200 focus-within:ring-2',
    error
      ? 'border-danger focus-within:border-danger focus-within:ring-danger/20'
      : 'border-gray-200 focus-within:border-accent focus-within:ring-accent/20',
    disabled ? 'opacity-40' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const inputClass = [
    'flex-1 bg-transparent outline-none text-[15px] text-text-primary placeholder:text-text-secondary py-2.5 disabled:cursor-not-allowed',
    prefix ? 'pl-2' : 'pl-3.5',
    suffix ? 'pr-2' : 'pr-3.5',
  ].join(' ')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[14px] font-medium text-text-primary">{label}</label>
      )}
      <div className={wrapperClass}>
        {prefix && (
          <span className="pl-3.5 text-[15px] text-text-secondary select-none shrink-0">
            {prefix}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={inputClass}
        />
        {suffix && (
          <span className="pr-3.5 text-[15px] text-text-secondary select-none shrink-0">
            {suffix}
          </span>
        )}
      </div>
      {error && <span className="text-[13px] text-danger">{error}</span>}
      {helper && !error && (
        <span className="text-[13px] text-text-secondary">{helper}</span>
      )}
    </div>
  )
}
