export default function ProgressBar({ step, totalSteps = 6 }) {
  const pct = Math.min(100, Math.round((step / totalSteps) * 100))
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
      <div
        className="h-full bg-accent transition-all duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
