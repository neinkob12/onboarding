const DRAFT_ID_KEY = 'onboarding_draft_id'

// TODO: implement Supabase Edge Function to forward this to WhatsApp/email
export async function notifySubmission({ client_name, districts, max_rent }) {
  const webhookUrl = import.meta.env.VITE_NOTIFY_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('VITE_NOTIFY_WEBHOOK_URL not set — skipping submission notification')
    return
  }

  try {
    const submission_id = localStorage.getItem(DRAFT_ID_KEY)
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission_id,
        client_name,
        districts,
        max_rent,
        submitted_at: new Date().toISOString(),
      }),
    })
  } catch (err) {
    console.warn('Submission notification failed:', err)
  }
}
