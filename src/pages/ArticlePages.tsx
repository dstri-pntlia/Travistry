import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import ArticleList from '../components/articles/ArticleList'
import ArticleDetail from '../components/articles/ArticleDetail'
import ArticleEditor from '../components/articles/ArticleEditor'
import { Button } from '../components/ui/button'
import useArticles from '../hooks/useArticle'
import useAuth from '../hooks/useAuth'
import type { Article, ArticleParams } from '../types/article'
import type { ArticleFormData } from "../components/articles/ArticleEditor"

const ArticlePage = () => {
  const { documentId } = useParams<{ documentId?: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const {
    articles,
    loading,
    error,
    pagination,
    getArticles,
    getArticleById,
    addArticle,
    editArticle,
    removeArticle
  } = useArticles()

  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)

  const [filters, setFilters] = useState<ArticleParams>({})

  const isEdit = location.pathname.endsWith('/edit')
  const isNew = location.pathname.endsWith('/new')
  const isDetail = !!documentId && !isEdit && !isNew

  useEffect(() => {
    if (documentId && (isEdit || isDetail)) {
      handleFetchArticle(documentId)
    }
  }, [documentId, isEdit, isDetail])

  useEffect(() => {
    getArticles(filters)
  }, [filters])

  const handleFetchArticle = async (id: string) => {
    const article = await getArticleById(id)
    if (article) {
      setCurrentArticle(article)
    }
  }

  const handleCreate = async (data: ArticleFormData) => {
    const result = await addArticle(data)
    if (result && result.id) {
      navigate(`/articles`)
    }
  }

  const handleUpdate = async (documentId: string, data: Partial<Article>) => {
    const result = await editArticle(documentId, data)
    if (result) {
      navigate(`/articles/${documentId}`)
    }
  }

  const handleDelete = async (documentId: string) => {
    const success = await removeArticle(documentId)
    if (success) {
      navigate('/articles')
      getArticles(filters)
    }
  }

  const handleFilterChange = (newFilters: Partial<ArticleParams>) => {
    setFilters({ ...filters, ...newFilters, page: 1 })
  }

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }


  if (isNew) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
        <ArticleEditor
          onSubmit={handleCreate}
          loading={loading}
          error={error ?? undefined}
        />
      </div>
    )
  }

  if (documentId && isEdit) {
    if (!currentArticle) return <div>Loading...</div>

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
        <ArticleEditor
          initialData={currentArticle}
          onSubmit={(data) => handleUpdate(documentId, data)}
          loading={loading}
          error={error ?? undefined}
        />
      </div>
    )
  }

  if (documentId && isDetail) {
    if (!currentArticle) return <div>Loading...</div>

    return (
      <ArticleDetail
        article={currentArticle}
        onDelete={user ? () => handleDelete(documentId) : undefined}
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Travel Articles</h1>
        {user && (
          <Button onClick={() => navigate('/articles/new')}>
            Create New Article
          </Button>
        )}
      </div>

      <ArticleList
        articles={articles}
        loading={loading}
        error={error ?? undefined}
        pagination={pagination}
        filters={filters}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        onDelete={user ? (id: string) => handleDelete(id) : undefined}
      />
    </div>
  )
}

export default ArticlePage
