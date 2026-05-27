import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are writing a German rental application cover letter (Anschreiben) on behalf of a real person applying for an apartment in Berlin.

Write in German. First person. Warm but professional tone. 3 short paragraphs maximum.
Do not use bullet points or headers.
Do not start with "Sehr geehrte Damen und Herren". Start with a direct personal sentence about the person and their interest.
Do not mention that this was written by AI, a service, or anyone other than the applicant.

Always include in natural prose: employment situation, monthly net income in EUR, intended move-in date, how long they plan to rent.
If extra_notes are provided, weave them in naturally — do not append them as a separate paragraph.
If employment_status is self_employed, frame income as stable freelance/business income.
If employment_status is student, omit income and mention studying instead.
Keep total length under 180 words.`

const DURATION_MAP = {
  indefinite: 'unbefristet / langfristig',
  '1_year': 'ca. 1 Jahr',
  '2_years': 'ca. 2 Jahre',
  temporary: 'vorübergehend / flexibel',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured.' })
  }

  const {
    first_name,
    last_name,
    employment_status,
    employer_name,
    employed_since,
    monthly_net_income,
    earliest_move_in,
    intended_rental_duration,
    extra_notes,
  } = req.body

  const duration = DURATION_MAP[intended_rental_duration] || intended_rental_duration || 'nicht angegeben'

  const userMessage = `Write a cover letter for this applicant:
Name: ${first_name} ${last_name}
Employment: ${employment_status} at ${employer_name}, since ${employed_since}
Monthly net income: €${monthly_net_income}
Move-in date: ${earliest_move_in}
Rental duration: ${duration}
Additional notes: ${extra_notes || 'none'}`

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })
    return res.status(200).json({ letter: message.content[0].text })
  } catch (err) {
    console.error('Anthropic API error:', err)
    return res.status(500).json({ error: err.message || 'Generation failed.' })
  }
}
