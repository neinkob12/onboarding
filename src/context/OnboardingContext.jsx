import { createContext, useContext, useEffect, useReducer } from 'react'

const STORAGE_KEY = 'wohnungsfinder_draft'

const INITIAL_STATE = {
  // Section 1: Identity
  first_name: '',
  last_name: '',
  date_of_birth: null,
  nationality: '',
  passport_number: '',
  passport_expiry: null,
  phone: '',
  profile_photo_url: null,

  // Section 2: Situation
  employment_status: null,
  employer_name: '',
  employed_since: '',
  monthly_net_income: null,
  people_moving_in: 1,
  has_pets: false,
  pet_details: '',
  is_smoker: false,

  // Section 3: Preferences
  districts: [],
  apartment_types: [],
  min_size_sqm: null,
  max_rent_warm: null,
  furnished_preference: null,
  earliest_move_in: null,
  intended_rental_duration: null,
  hard_requirements: [],
  nice_to_haves: [],
  extra_notes: '',

  // Section 4: Documents
  google_drive_folder_url: '',
  documents_checklist: {},

  // Section 5: Platform accounts
  is24_has_account: false,
  is24_has_plus: false,
  is24_email: '',
  is24_password_encrypted: '',
  kaz_has_account: false,
  kaz_email: '',
  kaz_password_encrypted: '',
  wgg_has_account: false,
  wgg_email: '',
  wgg_password_encrypted: '',

  // Cover letter
  cover_letter_draft: '',
  cover_letter_approved: false,
  cover_letter_approved_at: null,

  // Skip tracking
  skipped_fields: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.key]: action.value }
    case 'UPDATE_SECTION':
      return { ...state, ...action.fields }
    case 'MARK_SKIPPED':
      return {
        ...state,
        skipped_fields: [...new Set([...state.skipped_fields, ...action.fields])],
      }
    case 'CLEAR_DRAFT':
      return { ...INITIAL_STATE }
    default:
      return state
  }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...INITIAL_STATE, ...JSON.parse(raw) } : { ...INITIAL_STATE }
  } catch {
    return { ...INITIAL_STATE }
  }
}

const OnboardingContext = createContext(null)

export function OnboardingProvider({ children }) {
  const [formData, dispatch] = useReducer(reducer, undefined, loadFromStorage)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } catch {
      // Storage quota exceeded or unavailable
    }
  }, [formData])

  const updateField = (key, value) => dispatch({ type: 'UPDATE_FIELD', key, value })
  const updateSection = (fields) => dispatch({ type: 'UPDATE_SECTION', fields })
  const markSkipped = (fields) => dispatch({ type: 'MARK_SKIPPED', fields })
  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY)
    dispatch({ type: 'CLEAR_DRAFT' })
  }

  return (
    <OnboardingContext.Provider value={{ formData, updateField, updateSection, markSkipped, clearDraft }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}
