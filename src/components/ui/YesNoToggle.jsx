export default function YesNoToggle({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {[true, false].map((opt) => (
        <button
          key={String(opt)}
          type="button"
          onClick={() => onChange(opt)}
          className={[
            'px-5 py-2 rounded-chip text-[14px] font-medium transition-all duration-200 select-none',
            value === opt
              ? 'bg-accent text-white'
              : 'bg-bg-section text-text-primary hover:bg-gray-200',
          ].join(' ')}
        >
          {opt ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  )
}
