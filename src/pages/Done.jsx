import { motion } from 'framer-motion'

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER

export default function Done() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-bg-page">
      <div className="flex flex-col items-center text-center gap-6 max-w-[400px]">
        <CheckmarkIcon />
        <div className="flex flex-col gap-3">
          <h1 className="text-[28px] font-bold text-text-primary">You're all set.</h1>
          <p className="text-[16px] text-text-secondary leading-relaxed">
            We'll start looking for apartments that match your criteria. We'll be in touch when there's a viewing to confirm.
          </p>
        </div>
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-accent font-medium hover:underline transition-all duration-200"
          >
            Questions? Message us on WhatsApp →
          </a>
        )}
      </div>
    </div>
  )
}

function CheckmarkIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <motion.circle
        cx="36"
        cy="36"
        r="30"
        stroke="#34C759"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      <motion.path
        d="M22 36 L31 45 L50 27"
        stroke="#34C759"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
      />
    </svg>
  )
}
