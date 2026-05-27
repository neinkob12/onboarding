export default function SkipButton({ onSkip }) {
  return (
    <button
      type="button"
      onClick={onSkip}
      className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer"
    >
      Skip for now →
    </button>
  )
}
