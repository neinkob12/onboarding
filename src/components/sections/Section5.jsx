import { useOnboarding } from '../../context/OnboardingContext'
import Input from '../ui/Input'

const PLATFORMS = [
  {
    key: 'is24',
    name: 'ImmobilienScout24',
    initial: 'I',
    color: '#1DB48F',
    hasPlus: true,
    signupUrl: 'https://www.immobilienscout24.de/baufi-empfehlung/registrierung.html',
  },
  {
    key: 'kaz',
    name: 'Kleinanzeigen',
    initial: 'K',
    color: '#F5901E',
    hasPlus: false,
    signupUrl: 'https://www.kleinanzeigen.de/m-registrieren.html',
  },
  {
    key: 'wgg',
    name: 'WG-Gesucht',
    initial: 'W',
    color: '#E84040',
    hasPlus: false,
    signupUrl: 'https://www.wg-gesucht.de/registrierung.html',
  },
]

// Credential values must never be logged to the console.
function PlatformSection({ platform, formData, updateField, errors = {} }) {
  const { key, name, initial, color, hasPlus, signupUrl } = platform
  const hasAccount = formData[`${key}_has_account`]
  const email = formData[`${key}_email`]
  const password = formData[`${key}_password_encrypted`]
  const hasPlussy = hasPlus ? formData[`${key}_has_plus`] : false

  const emailFilled = !!email?.trim()
  const passwordFilled = !!password?.trim()
  const onlyOneCredential = (emailFilled || passwordFilled) && !(emailFilled && passwordFilled)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-semibold text-[15px] shrink-0"
          style={{ background: color }}
        >
          {initial}
        </div>
        <span className="text-[15px] font-medium text-text-primary">{name}</span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => updateField(`${key}_has_account`, true)}
          className={[
            'flex-1 py-2 rounded-[8px] text-[14px] font-medium border transition-all duration-200',
            hasAccount
              ? 'bg-accent text-white border-accent'
              : 'bg-white text-text-secondary border-gray-200 hover:border-gray-300',
          ].join(' ')}
        >
          I have an account
        </button>
        <button
          type="button"
          onClick={() => updateField(`${key}_has_account`, false)}
          className={[
            'flex-1 py-2 rounded-[8px] text-[14px] font-medium border transition-all duration-200',
            !hasAccount
              ? 'bg-accent text-white border-accent'
              : 'bg-white text-text-secondary border-gray-200 hover:border-gray-300',
          ].join(' ')}
        >
          I need to register
        </button>
      </div>

      {!hasAccount && (
        <a
          href={signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-accent underline underline-offset-2"
        >
          Create account on {name} →
        </a>
      )}

      {hasAccount && (
        <div className="flex flex-col gap-3">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => updateField(`${key}_email`, e.target.value)}
            placeholder="you@example.com"
            error={errors[`${key}_email`]}
            autoComplete="off"
          />
          <div>
            {/* TODO: encrypt before production — resolve credential storage approach with lawyer first */}
            <Input
              label="Password"
              value={password}
              onChange={(e) => updateField(`${key}_password_encrypted`, e.target.value)}
              placeholder="Your password"
              error={errors[`${key}_password_encrypted`]}
              autoComplete="new-password"
              showToggle
            />
          </div>

          {onlyOneCredential && (
            <p className="text-[13px] text-text-secondary">
              Add both email and password so we can log in on your behalf.
            </p>
          )}

          {hasPlus && (
            <div className="flex flex-col gap-2.5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPlussy}
                  onChange={(e) => updateField(`${key}_has_plus`, e.target.checked)}
                  className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer accent-[#0071E3]"
                />
                <span className="text-[15px] text-text-primary leading-snug">
                  I have IS24 Plus / Premium
                </span>
              </label>
              {!hasPlussy && (
                <div
                  style={{
                    background: 'rgba(255,149,0,0.08)',
                    borderLeft: '3px solid #FF9500',
                    borderRadius: '8px',
                    padding: '12px 16px',
                  }}
                >
                  <p className="text-[14px] text-text-primary leading-relaxed">
                    IS24 Plus significantly increases response rates by showing your profile to landlords. We recommend upgrading before we start sending applications.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Section5({ errors = {} }) {
  const { formData, updateField } = useOnboarding()

  return (
    <div className="flex flex-col">
      {PLATFORMS.map((platform, index) => (
        <div key={platform.key}>
          <PlatformSection
            platform={platform}
            formData={formData}
            updateField={updateField}
            errors={errors}
          />
          {index < PLATFORMS.length - 1 && (
            <hr className="border-gray-100 my-6" />
          )}
        </div>
      ))}
    </div>
  )
}
