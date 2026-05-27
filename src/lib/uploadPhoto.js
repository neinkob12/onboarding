import { supabase } from './supabase'

export async function uploadProfilePhoto(file) {
  const ext = file.name.split('.').pop()
  const path = `draft-${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('profile-photos')
    .upload(path, file, { upsert: true })

  if (error) throw error

  const { data } = supabase.storage.from('profile-photos').getPublicUrl(path)
  return data.publicUrl
}
