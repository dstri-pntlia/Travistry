export const API_BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id'
export const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c'

export const CATEGORIES = [
  'Beach',
  'Mountain',
  'City',
  'Countryside',
  'Historical',
  'Adventure',
  'Cultural',
  'Food',
  'Wildlife',
  'Other'
]

export const DEFAULT_ARTICLE_PARAMS = {
  search: '',
  category: '',
  sort: 'desc',
  page: 1,
  limit: 10,
}

export const SOCIAL_SHARE_LINKS = {
  facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
  twitter: 'https://twitter.com/intent/tweet?url=',
  whatsapp: 'https://wa.me/?text=',
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString();
}