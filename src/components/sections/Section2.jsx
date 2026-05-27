import { AnimatePresence, motion } from 'framer-motion'
import { useOnboarding } from '../../context/OnboardingContext'
import Input from '../ui/Input'
import YesNoToggle from '../ui/YesNoToggle'
import Stepper from '../ui/Stepper'

const EMPLOYMENT_OPTIONS = [
  { value: 'employed', label: 'Employed' },
  { value: 'self_employed', label: 'Self-employed' },
  { value: 'student', label: 'Student' },
  { value: 'other', label: 'Other' },
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const SELECT_CLASS =
  'w-full px-3.5 py-2.5 text-[15px] rounded-input border border-gray-200 bg-white text-text-primary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200'

function getEmployerLabel(status) {
  if (status === 'self_employed') return 'Company name'
  if (status === 'student') return 'University'
  if (status === 'other') return 'Organisation (optional)'
  return 'Employer'
}

function getSinceLabel(status) {
  if (status === 'self_employed') return 'Self-employed since'
  if (status === 'student') return 'Studying since'
  return 'Employed since'
}

export default function Section2({ errors = {} }) {
  const { formData, updateField } = useOnboarding()

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i)
  const [sinceMonth = '', sinceYear = ''] = (formData.employed_since || '').split('/')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-medium text-text-primary">Employment status</label>
        <div className="grid grid-cols-2 gap-2">
          {EMPLOYMENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateField('employment_status', opt.value)}
              className={[
                'px-4 py-2.5 text-[15px] font-medium rounded-input border transition-all duration-200 select-none',
                formData.employment_status === opt.value
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-text-primary border-gray-200 hover:border-gray-300',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors.employment_status && (
          <span className="text-[13px] text-danger">{errors.employment_status}</span>
        )}
      </div>

      <Input
        label={getEmployerLabel(formData.employment_status)}
        value={formData.employer_name}
        onChange={(e) => updateField('employer_name', e.target.value)}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-medium text-text-primary">
          {getSinceLabel(formData.employment_status)}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <select
            value={sinceMonth}
            onChange={(e) => updateField('employed_since', `${e.target.value}/${sinceYear}`)}
            className={SELECT_CLASS}
          >
            <option value="">Month</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
            ))}
          </select>
          <select
            value={sinceYear}
            onChange={(e) => updateField('employed_since', `${sinceMonth}/${e.target.value}`)}
            className={SELECT_CLASS}
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Monthly net income (EUR)"
        type="number"
        value={formData.monthly_net_income ?? ''}
        onChange={(e) => updateField('monthly_net_income', e.target.value ? parseInt(e.target.value, 10) : null)}
        placeholder="e.g. 3500"
        helper="This appears in your application messages."
        error={errors.monthly_net_income}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-medium text-text-primary">People moving in</label>
        <Stepper
          value={formData.people_moving_in}
          onChange={(val) => updateField('people_moving_in', val)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-text-primary">Pets</label>
        <YesNoToggle value={formData.has_pets} onChange={(val) => updateField('has_pets', val)} />
        <AnimatePresence>
          {formData.has_pets && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <Input
                label="What kind?"
                value={formData.pet_details}
                onChange={(e) => updateField('pet_details', e.target.value)}
                placeholder="e.g. small dog, two cats"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-text-primary">Smoker</label>
        <YesNoToggle value={formData.is_smoker} onChange={(val) => updateField('is_smoker', val)} />
      </div>
    </div>
  )
}
