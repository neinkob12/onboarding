import { useParams, useNavigate, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'

const SECTIONS = {
  1: { title: 'About you', subtitle: 'Tell us a bit about yourself.' },
  2: { title: 'Your situation', subtitle: 'Help us understand your background.' },
  3: { title: "What you're looking for", subtitle: 'Your ideal apartment in Berlin.' },
  4: { title: 'Your documents', subtitle: 'Secure access to your application documents.' },
  5: { title: 'Platform accounts', subtitle: "Credentials for the platforms we'll use to apply." },
}

export default function Onboarding() {
  const { step } = useParams()
  const navigate = useNavigate()
  const stepNum = parseInt(step, 10)

  if (!stepNum || stepNum < 1 || stepNum > 5) {
    return <Navigate to="/onboarding/1" replace />
  }

  const section = SECTIONS[stepNum]

  function handleBack() {
    navigate(`/onboarding/${stepNum - 1}`)
  }

  function handleContinue() {
    if (stepNum < 5) {
      navigate(`/onboarding/${stepNum + 1}`)
    } else {
      navigate('/cover-letter')
    }
  }

  return (
    <Layout
      step={stepNum}
      title={section.title}
      subtitle={section.subtitle}
      onBack={handleBack}
      onContinue={handleContinue}
      onSkip={handleContinue}
    >
      {/* Section {stepNum} fields added in Phase 2/3/4/5 */}
    </Layout>
  )
}
