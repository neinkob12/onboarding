import { supabase } from './supabase'

const DRAFT_ID_KEY = 'onboarding_draft_id'

export async function saveDraft(fields) {
  const existingId = localStorage.getItem(DRAFT_ID_KEY)

  if (!existingId) {
    const { data, error } = await supabase
      .from('onboarding_submissions')
      .insert({ ...fields, status: 'draft' })
      .select('id')
      .single()

    if (error) throw error
    localStorage.setItem(DRAFT_ID_KEY, data.id)
    return data.id
  }

  const { error } = await supabase
    .from('onboarding_submissions')
    .update(fields)
    .eq('id', existingId)

  if (error) throw error
  return existingId
}
