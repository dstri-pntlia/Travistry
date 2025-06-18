import client from './client'
import type { Article, ArticleParams, ArticleResponse } from '../types/article'

export const fetchArticles = async (params: ArticleParams): Promise<ArticleResponse> => {
  const response = await client.get('/articles', { params })
  return response.data
}

export const fetchArticleById = async (documentId: string): Promise<Article> => {
  const response = await client.get(`/articles/${documentId}`)
  return response.data.data
}

export const createArticle = async (data: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>): Promise<Article> => {
  const response = await client.post('/articles', data)
  return response.data.data
}

export const updateArticle = async (documentId: string, data: Partial<Article>): Promise<Article> => {
  const response = await client.put(`/articles/${documentId}`, data)
  return response.data.data
}

export const deleteArticle = async (documentId: string): Promise<void> => {
  await client.delete(`/articles/${documentId}`)
}