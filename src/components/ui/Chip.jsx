export default function Chip({
  label,
  mode = 'selectable',
  selected = false,
  onSelect,
  onRemove,
}) {
  if (mode === 'removable') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-chip text-[13px] font-medium bg-accent/10 text-accent">
        {label}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-accent/20 transition-colors duration-200 leading-none"
        >
          ×
        </button>
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'inline-flex items-center px-3 py-1 rounded-chip text-[13px] font-medium',
        'transition-all duration-200 cursor-pointer select-none',
        selected
          ? 'bg-accent text-white'
          : 'bg-bg-section text-text-primary hover:bg-gray-200',
      ]
        .join(' ')}
    >
      {label}
    </button>
  )
}
