import { useState, useRef } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '../components/Layout'
import Section1 from '../components/sections/Section1'
import Section2 from '../components/sections/Section2'
import Section3 from '../components/sections/Section3'
import Section4 from '../components/sections/Section4'
import Section5 from '../components/sections/Section5'
import { useOnboarding } from '../context/OnboardingContext'
import { saveDraft } from '../lib/saveDraft'
import { validateSection1, validateSection2, validateSection3, validateSection4 } from '../lib/validation'

const SECTION_1_FIELDS = ['first_name', 'last_name', 'date_of_birth', 'nationality', 'passport_number', 'passport_expiry', 'phone', 'profile_photo_url']
const SECTION_2_FIELDS = ['employment_status', 'employer_name', 'employed_since', 'monthly_net_income', 'people_moving_in', 'has_pets', 'pet_details', 'is_smoker']
const SECTION_3_FIELDS = ['districts', 'apartment_types', 'min_size_sqm', 'max_rent_warm', 'furnished_preference', 'earliest_move_in', 'intended_rental_duration', 'hard_requirements', 'nice_to_haves', 'extra_notes']
const SECTION_4_FIELDS = ['google_drive_folder_url', 'documents_checklist']
const SECTION_5_FIELDS = ['is24_has_account', 'is24_has_plus', 'is24_email', 'is24_password_encrypted', 'kaz_has_account', 'kaz_email', 'kaz_password_encrypted', 'wgg_has_account', 'wgg_email', 'wgg_password_encrypted']
const SECTION_1_OPTIONAL = ['date_of_birth', 'nationality', 'passport_number', 'passport_expiry', 'profile_photo_url']

const SECTIONS = {
  1: { title: 'About you', subtitle: 'Tell us a bit about yourself.' },
  2: { title: 'Your situation', subtitle: 'Help us understand your background.' },
  3: { title: "What you're looking for", subtitle: 'Your ideal apartment in Berlin.' },
  4: { title: 'Your documents', subtitle: 'Secure access to your application documents.' },
  5: { title: 'Platform accounts', subtitle: "Credentials for the platforms we'll use to apply." },
}

const slideVariants = {
  enter: (dir) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir * -40, opacity: 0 }),
}

function pickFields(formData, keys) {
  return Object.fromEntries(keys.map((k) => [k, formData[k]]))
}

export default function Onboarding() {
  const { step } = useParams()
  const navigate = useNavigate()
  const { formData, markSkipped } = useOnboarding()
  const [errors, setErrors] = useState({})
  const directionRef = useRef(1)
  const stepNum = parseInt(step, 10)

  if (!stepNum || stepNum < 1 || stepNum > 5) {
    return <Navigate to="/onboarding/1" replace />
  }

  const section = SECTIONS[stepNum]

  function advance() {
    directionRef.current = 1
    if (stepNum < 5) navigate(`/onboarding/${stepNum + 1}`)
    else navigate('/cover-letter')
  }

  async function trySave(fields) {
    try {
      await saveDraft(fields)
    } catch (err) {
      console.error('Draft save failed:', err)
    }
  }

  async function handleContinue() {
    const validate =
      stepNum === 1 ? validateSection1 :
      stepNum === 2 ? validateSection2 :
      stepNum === 3 ? validateSection3 :
      stepNum === 4 ? validateSection4 :
      null
    if (validate) {
      const errs = validate(formData)
      if (Object.keys(errs).length > 0) {
        setErrors(errs)
        return
      }
    }
    setErrors({})
    if (stepNum === 1) await trySave(pickFields(formData, SECTION_1_FIELDS))
    if (stepNum === 2) await trySave(pickFields(formData, SECTION_2_FIELDS))
    if (stepNum === 3) await trySave(pickFields(formData, SECTION_3_FIELDS))
    if (stepNum === 4) await trySave(pickFields(formData, SECTION_4_FIELDS))
    if (stepNum === 5) await trySave(pickFields(formData, SECTION_5_FIELDS))
    advance()
  }

  async function handleSkip() {
    if (stepNum === 1) {
      const errs = validateSection1(formData)
      if (Object.keys(errs).length > 0) {
        setErrors(errs)
        return
      }
      const emptyOptionals = SECTION_1_OPTIONAL.filter((f) => !formData[f])
      if (emptyOptionals.length > 0) markSkipped(emptyOptionals)
      await trySave(pickFields(formData, SECTION_1_FIELDS))
    } else if (stepNum === 2) {
      const updatedSkipped = [...new Set([...formData.skipped_fields, ...SECTION_2_FIELDS])]
      markSkipped(SECTION_2_FIELDS)
      await trySave({ skipped_fields: updatedSkipped })
    } else if (stepNum === 3) {
      const updatedSkipped = [...new Set([...formData.skipped_fields, ...SECTION_3_FIELDS])]
      markSkipped(SECTION_3_FIELDS)
      await trySave({ skipped_fields: updatedSkipped })
    } else if (stepNum === 4) {
      const errs = validateSection4(formData)
      if (Object.keys(errs).length > 0) {
        setErrors(errs)
        return
      }
      const updatedSkipped = [...new Set([...formData.skipped_fields, ...SECTION_4_FIELDS])]
      markSkipped(SECTION_4_FIELDS)
      await trySave({ skipped_fields: updatedSkipped })
    }
    setErrors({})
    advance()
  }

  function handleBack() {
    setErrors({})
    directionRef.current = -1
    navigate(`/onboarding/${stepNum - 1}`)
  }

  return (
    <Layout
      step={stepNum}
      title={section.title}
      subtitle={section.subtitle}
      onBack={handleBack}
      onContinue={handleContinue}
      onSkip={handleSkip}
    >
      <AnimatePresence mode="wait" custom={directionRef.current}>
        <motion.div
          key={stepNum}
          custom={directionRef.current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {stepNum === 1 && <Section1 errors={errors} />}
          {stepNum === 2 && <Section2 errors={errors} />}
          {stepNum === 3 && <Section3 errors={errors} />}
          {stepNum === 4 && <Section4 errors={errors} />}
          {stepNum === 5 && <Section5 errors={errors} />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}
