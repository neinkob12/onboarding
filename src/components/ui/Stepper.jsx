export default function Stepper({ value, min = 1, max = 6, onChange }) {
  const btnClass =
    'w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[20px] leading-none text-text-primary hover:bg-bg-section disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 select-none'

  return (
    <div className="flex items-center gap-4">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className={btnClass}>
        −
      </button>
      <span className="text-[18px] font-medium text-text-primary w-8 text-center">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className={btnClass}>
        +
      </button>
    </div>
  )
}
