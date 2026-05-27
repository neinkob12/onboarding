import Chip from '../ui/Chip'
import { useOnboarding } from '../../context/OnboardingContext'

const OPTIONS = [
  'Balcony / Terrace', 'Garden access', 'Built-in kitchen', 'Elevator',
  'Barrier-free', 'Parking / Garage', 'Pets allowed', 'Anmeldung possible',
  'No ground floor', 'Basement / Storage',
]

export default function DualFilterChips() {
  const { formData, updateField, updateSection } = useOnboarding()
  const hard = formData.hard_requirements ?? []
  const nice = formData.nice_to_haves ?? []

  function toggleHard(option) {
    if (hard.includes(option)) {
      updateField('hard_requirements', hard.filter((o) => o !== option))
    } else {
      updateSection({
        hard_requirements: [...hard, option],
        nice_to_haves: nice.filter((o) => o !== option),
      })
    }
  }

  function toggleNice(option) {
    if (nice.includes(option)) {
      updateField('nice_to_haves', nice.filter((o) => o !== option))
    } else {
      updateSection({
        nice_to_haves: [...nice, option],
        hard_requirements: hard.filter((o) => o !== option),
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <ChipGroup label="Must have" options={OPTIONS} active={hard} onToggle={toggleHard} variant="blue" />
      <ChipGroup label="Preferred but not essential" options={OPTIONS} active={nice} onToggle={toggleNice} variant="green" />
    </div>
  )
}

function ChipGroup({ label, options, active, onToggle, variant }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-medium text-text-primary">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            selected={active.includes(opt)}
            onSelect={() => onToggle(opt)}
            variant={variant}
          />
        ))}
      </div>
    </div>
  )
}
