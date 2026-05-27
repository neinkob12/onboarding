import { useOnboarding } from '../../context/OnboardingContext'
import Input from '../ui/Input'
import PhotoUpload from '../ui/PhotoUpload'
import { uploadProfilePhoto } from '../../lib/uploadPhoto'

export default function Section1({ errors = {} }) {
  const { formData, updateField } = useOnboarding()

  async function handlePhotoUpload(file) {
    const url = await uploadProfilePhoto(file)
    updateField('profile_photo_url', url)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First name"
          value={formData.first_name}
          onChange={(e) => updateField('first_name', e.target.value)}
          error={errors.first_name}
          autoComplete="given-name"
        />
        <Input
          label="Last name"
          value={formData.last_name}
          onChange={(e) => updateField('last_name', e.target.value)}
          error={errors.last_name}
          autoComplete="family-name"
        />
      </div>

      <Input
        label="Date of birth"
        type="date"
        value={formData.date_of_birth ?? ''}
        onChange={(e) => updateField('date_of_birth', e.target.value || null)}
      />

      <Input
        label="Nationality"
        value={formData.nationality}
        onChange={(e) => updateField('nationality', e.target.value)}
        placeholder="e.g. German, American"
        autoComplete="off"
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Passport number"
          value={formData.passport_number}
          onChange={(e) => updateField('passport_number', e.target.value)}
          autoComplete="off"
        />
        <Input
          label="Passport expiry"
          type="date"
          value={formData.passport_expiry ?? ''}
          onChange={(e) => updateField('passport_expiry', e.target.value || null)}
        />
      </div>

      <Input
        label="Phone number"
        type="tel"
        value={formData.phone}
        onChange={(e) => updateField('phone', e.target.value)}
        error={errors.phone}
        autoComplete="tel"
      />

      <PhotoUpload currentUrl={formData.profile_photo_url} onUpload={handlePhotoUpload} />
    </div>
  )
}
