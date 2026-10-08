import type { CustomerProfile } from '../types/store'

export const MAX_ITEM_QUANTITY = 99

export const EMPTY_PROFILE: CustomerProfile = {
  name: '',
  email: '',
  phone: '',
  zipCode: '',
  address: '',
  city: '',
}
