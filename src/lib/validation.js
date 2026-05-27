export function validateSection1(formData) {
  const errors = {}
  if (!formData.first_name?.trim()) errors.first_name = 'First name is required'
  if (!formData.last_name?.trim()) errors.last_name = 'Last name is required'
  if (!formData.phone?.trim()) errors.phone = 'Phone number is required'
  return errors
}

export function validateSection2(formData) {
  const errors = {}
  if (!formData.employment_status) errors.employment_status = 'Please select your employment status'
  if (!formData.monthly_net_income) errors.monthly_net_income = 'Monthly income is required'
  return errors
}

export function validateSection3(formData) {
  const errors = {}
  if (!formData.districts?.length) errors.districts = 'Select at least one district'
  if (!formData.apartment_types?.length) errors.apartment_types = 'Select at least one apartment type'
  if (!formData.max_rent_warm) errors.max_rent_warm = 'Maximum rent is required'
  return errors
}
