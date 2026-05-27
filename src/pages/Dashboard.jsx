import { useParams } from 'react-router-dom'

export default function Dashboard() {
  const { clientId } = useParams()

  return (
    <div className="min-h-screen bg-bg-page px-6 py-12">
      <div className="mx-auto max-w-content">
        <h1 className="text-[28px] font-bold text-text-primary">Your viewings</h1>
        {/* Dashboard content added in Phase 7 (clientId: {clientId}) */}
      </div>
    </div>
  )
}
