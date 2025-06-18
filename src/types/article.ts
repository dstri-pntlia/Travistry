export interface Article {
  id: string
  documentId?: string
  title: string
  description: string
  category?: number
  cover_image_url?: string
  createdAt: string
  updatedAt: string
  createdBy: {
    id: string
    name: string
    email: string
  }
}

export interface ArticleResponse {
  data: Article[]
  currentPage: number
  totalPages: number
  totalItems: number
}

export interface ArticleParams {
  search?: string
  category?: string
  sort?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}