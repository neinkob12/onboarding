export default function Done() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page px-6">
      <div className="text-center max-w-content">
        <h1 className="text-[28px] font-bold text-text-primary">You're all set.</h1>
        <p className="mt-3 text-[15px] text-text-secondary">
          We'll start looking for apartments matching your criteria. You'll hear from us when
          there's a viewing to confirm.
        </p>
        {/* Done screen content (animated checkmark etc.) added in Phase 6 */}
      </div>
    </div>
  )
}
