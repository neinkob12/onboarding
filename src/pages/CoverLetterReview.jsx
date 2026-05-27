import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import Button from '../components/ui/Button'
import { useOnboarding } from '../context/OnboardingContext'
import { saveDraft } from '../lib/saveDraft'
import { notifySubmission } from '../lib/notifySubmission'

export default function CoverLetterReview() {
  const navigate = useNavigate()
  const { formData, updateField } = useOnboarding()
  const [phase, setPhase] = useState('generating') // 'generating' | 'reviewing' | 'error'
  const [letter, setLetter] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isApproving, setIsApproving] = useState(false)

  useEffect(() => {
    generateLetter()
  }, [])

  async function generateLetter() {
    setPhase('generating')
    setErrorMsg('')
    try {
      const res = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          employment_status: formData.employment_status,
          employer_name: formData.employer_name,
          employed_since: formData.employed_since,
          monthly_net_income: formData.monthly_net_income,
          earliest_move_in: formData.earliest_move_in,
          intended_rental_duration: formData.intended_rental_duration,
          extra_notes: formData.extra_notes,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setLetter(data.letter)
      setPhase('reviewing')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong generating your message.')
      setPhase('error')
    }
  }

  async function handleApprove() {
    if (phase !== 'reviewing' || isApproving) return
    setIsApproving(true)
    try {
      updateField('cover_letter_draft', letter)
      await saveDraft({
        cover_letter_draft: letter,
        cover_letter_approved: true,
        cover_letter_approved_at: new Date().toISOString(),
        status: 'complete',
      })
      await notifySubmission({
        client_name: `${formData.first_name} ${formData.last_name}`,
        districts: formData.districts,
        max_rent: formData.max_rent_warm,
      })
      navigate('/done')
    } catch (err) {
      console.error('Approval failed:', err)
      setIsApproving(false)
    }
  }

  return (
    <Layout
      step={6}
      title="Your application message"
      subtitle="We generated this based on your details. Edit it if you'd like, then approve it."
      onBack={() => navigate('/onboarding/5')}
      onContinue={handleApprove}
      continueLabel={isApproving ? 'Saving...' : 'Approve and go live'}
      continueDisabled={phase !== 'reviewing' || isApproving}
      hideSkip
    >
      {phase === 'generating' && <ShimmerState />}
      {phase === 'error' && <ErrorState message={errorMsg} onRetry={generateLetter} />}
      {phase === 'reviewing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-3"
        >
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            style={{ fieldSizing: 'content', minHeight: '280px' }}
            className="w-full px-3.5 py-2.5 text-[15px] rounded-input border border-gray-200 bg-white text-text-primary outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
          />
          <span className="text-[13px] text-text-secondary">{letter.length} characters</span>
          <div>
            <Button variant="ghost" size="sm" onClick={generateLetter}>
              Regenerate
            </Button>
          </div>
          <p className="text-[13px] text-text-secondary text-center mt-2">
            By approving, you authorise us to submit applications on your behalf using the details you've provided.
          </p>
        </motion.div>
      )}
    </Layout>
  )
}

function ShimmerState() {
  return (
    <div className="flex flex-col gap-4">
      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .shimmer-line { animation: shimmer 1.5s ease-in-out infinite; }
      `}</style>
      <div className="flex flex-col gap-3">
        <div className="shimmer-line h-4 rounded-[6px] bg-[#F5F5F7] w-full" />
        <div className="shimmer-line h-4 rounded-[6px] bg-[#F5F5F7] w-4/5" style={{ animationDelay: '0.15s' }} />
        <div className="shimmer-line h-4 rounded-[6px] bg-[#F5F5F7] w-3/5" style={{ animationDelay: '0.3s' }} />
      </div>
      <p className="text-[14px] text-text-secondary">Generating your message...</p>
    </div>
  )
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] text-text-primary">{message}</p>
      <Button variant="ghost" onClick={onRetry}>Try again</Button>
    </div>
  )
}
