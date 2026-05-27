import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

export default function CoverLetterReview() {
  const navigate = useNavigate()

  return (
    <Layout
      step={6}
      title="Your cover letter"
      subtitle="Review and approve your personalised application letter."
      onContinue={() => navigate('/done')}
      continueLabel="Approve and go live"
      hideSkip
    >
      {/* Cover letter content added in Phase 5 */}
    </Layout>
  )
}
