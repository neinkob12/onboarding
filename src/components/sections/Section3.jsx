import { useOnboarding } from '../../context/OnboardingContext'
import DistrictSelector from '../map/DistrictSelector'
import DualFilterChips from './DualFilterChips'
import Chip from '../ui/Chip'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'

const APARTMENT_TYPES = ['WG-Zimmer', 'Studio', '1-Zimmer', '2-Zimmer', '3-Zimmer', '4+-Zimmer', 'Zwischenmiete']

const FURNISHED_OPTIONS = [
  { value: 'furnished', label: 'Furnished' },
  { value: 'unfurnished', label: 'Unfurnished' },
  { value: 'both', label: 'Either' },
]

const DURATION_OPTIONS = [
  { value: 'indefinite', label: 'Indefinitely' },
  { value: '1_year', label: '~1 year' },
  { value: '2_years', label: '~2 years' },
  { value: 'temporary', label: 'Flexible' },
]

export default function Section3({ errors = {} }) {
  const { formData, updateField } = useOnboarding()
  const apartmentTypes = formData.apartment_types ?? []

  function toggleApartmentType(type) {
    updateField(
      'apartment_types',
      apartmentTypes.includes(type)
        ? apartmentTypes.filter((t) => t !== type)
        : [...apartmentTypes, type]
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-text-primary">Districts</label>
        {errors.districts && (
          <span className="text-[13px] text-danger">{errors.districts}</span>
        )}
        <DistrictSelector />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-text-primary">Apartment type</label>
        {errors.apartment_types && (
          <span className="text-[13px] text-danger">{errors.apartment_types}</span>
        )}
        <div className="flex flex-wrap gap-2">
          {APARTMENT_TYPES.map((type) => (
            <Chip
              key={type}
              label={type}
              selected={apartmentTypes.includes(type)}
              onSelect={() => toggleApartmentType(type)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Minimum size"
          type="number"
          suffix="m²"
          value={formData.min_size_sqm ?? ''}
          onChange={(e) => updateField('min_size_sqm', e.target.value ? parseInt(e.target.value, 10) : null)}
          placeholder="e.g. 40"
        />
        <Input
          label="Maximum rent (Warmmiete)"
          type="number"
          prefix="€"
          value={formData.max_rent_warm ?? ''}
          onChange={(e) => updateField('max_rent_warm', e.target.value ? parseInt(e.target.value, 10) : null)}
          placeholder="e.g. 1200"
          helper="Including all running costs."
          error={errors.max_rent_warm}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-medium text-text-primary">Furnished</label>
        <div className="flex gap-2">
          {FURNISHED_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateField('furnished_preference', opt.value)}
              className={[
                'flex-1 px-4 py-2.5 text-[14px] font-medium rounded-input border transition-all duration-200 select-none',
                formData.furnished_preference === opt.value
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-text-primary border-gray-200 hover:border-gray-300',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Earliest move-in"
        type="date"
        value={formData.earliest_move_in ?? ''}
        onChange={(e) => updateField('earliest_move_in', e.target.value || null)}
      />

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-text-primary">
          Intended rental duration
        </label>
        <div className="flex flex-wrap gap-2">
          {DURATION_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              selected={formData.intended_rental_duration === opt.value}
              onSelect={() => updateField('intended_rental_duration', opt.value)}
            />
          ))}
        </div>
      </div>

      <DualFilterChips />

      <TextArea
        label="Anything to add to your applications? (optional)"
        value={formData.extra_notes}
        onChange={(e) => updateField('extra_notes', e.target.value)}
        placeholder="e.g. I work remotely, very quiet, no parties, long-term tenant"
        maxLength={300}
        rows={4}
      />
    </div>
  )
}
