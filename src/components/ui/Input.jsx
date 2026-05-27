import { useState } from 'react'

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
  showToggle = false,
}) {
  const [visible, setVisible] = useState(false)
  const resolvedType = showToggle ? (visible ? 'text' : 'password') : type

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
    showToggle || suffix ? 'pr-2' : 'pr-3.5',
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
          type={resolvedType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={inputClass}
        />
        {showToggle ? (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            tabIndex={-1}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="pr-3 flex items-center text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        ) : suffix ? (
          <span className="pr-3.5 text-[15px] text-text-secondary select-none shrink-0">
            {suffix}
          </span>
        ) : null}
      </div>
      {error && <span className="text-[13px] text-danger">{error}</span>}
      {helper && !error && (
        <span className="text-[13px] text-text-secondary">{helper}</span>
      )}
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
