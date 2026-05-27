import { useOnboarding } from '../../context/OnboardingContext'
import Input from '../ui/Input'

const CHECKLIST_ITEMS = [
  { key: 'schufa', label: 'SCHUFA Bonitätsauskunft' },
  { key: 'payslips', label: 'Last 3 payslips (or last 2 tax assessments if self-employed)' },
  { key: 'employment_letter', label: 'Employment confirmation letter (Arbeitsbestätigung)' },
  { key: 'passport', label: 'Passport / ID copy' },
  { key: 'bank_statements', label: 'Bank statements — last 3 months', optional: true },
  { key: 'bwa', label: 'BWA from your tax advisor', optional: true, selfEmployedOnly: true },
]

export default function Section4({ errors = {} }) {
  const { formData, updateField } = useOnboarding()
  const checklist = formData.documents_checklist ?? {}

  const visibleItems = CHECKLIST_ITEMS.filter(
    (item) => !item.selfEmployedOnly || formData.employment_status === 'self_employed'
  )

  function toggleItem(key) {
    updateField('documents_checklist', { ...checklist, [key]: !checklist[key] })
  }

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Google Drive folder link"
        value={formData.google_drive_folder_url}
        onChange={(e) => updateField('google_drive_folder_url', e.target.value)}
        placeholder="https://drive.google.com/drive/folders/..."
        error={errors.google_drive_folder_url}
        autoComplete="off"
      />

      <div className="flex flex-col gap-3">
        <label className="text-[14px] font-medium text-text-primary">Document checklist</label>
        <div className="flex flex-col gap-2.5">
          {visibleItems.map((item) => (
            <label key={item.key} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!checklist[item.key]}
                onChange={() => toggleItem(item.key)}
                className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer accent-[#0071E3]"
              />
              <span className="text-[15px] text-text-primary leading-snug">
                {item.label}
                {item.optional && (
                  <span className="text-text-secondary ml-1.5">(optional)</span>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div
        style={{
          background: 'rgba(0,113,227,0.06)',
          borderLeft: '3px solid #0071E3',
          borderRadius: '8px',
          padding: '12px 16px',
        }}
      >
        <p className="text-[14px] text-text-primary leading-relaxed">
          Not ready yet? You can skip this and add your folder link later. We'll remind you before we start sending applications.
        </p>
      </div>
    </div>
  )
}
