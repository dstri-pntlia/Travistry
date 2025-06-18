import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../store/articlesSlice'
import client from '../api/client'
import type { Article, ArticleParams } from '../types/article';
import type { AppDispatch } from '../store/store';

const useArticles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, pagination } = useSelector((state: RootState) => state.articles)
  const [operationLoading, setOperationLoading] = useState(false)
  const [operationError, setOperationError] = useState<string | null>(null)

  const getArticles = (params: ArticleParams) => {
    dispatch(fetchArticles(params))
  }

  const getArticleById = async (documentId: string): Promise<Article | null> => {
    try {
      const response = await client.get(`/articles/${documentId}`)
      return response.data.data
    } catch (error: any) {
      setOperationError(error.response?.data?.message || 'Failed to fetch article')
      return null
    }
  }

  const addArticle = async (articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    setOperationLoading(true)
    setOperationError(null)
    try {
      console.log('Article data before dispatch:', articleData)
      const response = await dispatch(createArticle(articleData))
      return response.payload
    } catch (error) {
      if (error instanceof Error && 'response' in error) {
      setOperationError((error as any).response?.data?.message || 'Failed to create article');
    }
      return null
    } finally {
      setOperationLoading(false)
    }
  }

  const editArticle = async (documentId: string, articleData: Partial<Article>) => {
    setOperationLoading(true)
    setOperationError(null)
    try {
      const response = await dispatch(updateArticle({ documentId, data: articleData }))
      return response.payload
    } catch (error) {
      if (error instanceof Error && 'response' in error) {
      setOperationError((error as any).response?.data?.message || 'Failed to update article');
    }
      return null
    } finally {
      setOperationLoading(false)
    }
  }

  const removeArticle = async (documentId: string) => {
    setOperationLoading(true)
    setOperationError(null)
    try {
      await dispatch(deleteArticle(documentId))
      return true
    } catch (error: any) {
      setOperationError(error.response?.data?.message || 'Failed to delete article')
      return false
    } finally {
      setOperationLoading(false)
    }
  }

  return {
    articles: data,
    loading,
    error,
    pagination,
    operationLoading,
    operationError,
    getArticles,
    getArticleById,
    addArticle,
    editArticle,
    removeArticle,
  }
}

export default useArticles