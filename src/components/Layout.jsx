import ProgressBar from './ui/ProgressBar'
import Button from './ui/Button'
import SkipButton from './ui/SkipButton'

export default function Layout({
  step,
  title,
  subtitle,
  children,
  onBack,
  onContinue,
  onSkip,
  continueLabel = 'Continue',
  continueDisabled = false,
  hideSkip = false,
}) {
  return (
    <div className="min-h-screen bg-bg-page">
      <ProgressBar step={step} />

      <div className="mx-auto max-w-content px-6 pt-10 pb-40">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-text-primary leading-tight">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-[15px] text-text-secondary">{subtitle}</p>
          )}
        </div>

        <div>{children}</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
        <div className="mx-auto max-w-content">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <Button variant="ghost" onClick={onBack}>
                Back
              </Button>
            )}
            <div className="flex-1">
              <Button variant="primary" onClick={onContinue} fullWidth disabled={continueDisabled}>
                {continueLabel}
              </Button>
            </div>
          </div>

          {!hideSkip && onSkip && (
            <div className="mt-3 text-center">
              <SkipButton onSkip={onSkip} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
