// components/articles/ArticleList.tsx
import ArticleCard from './ArticleCard'
import ArticleFilter from './ArticleFilter'
import Pagination from './Pagination'
import LoadingSpinner from '../common/LoadingSpinner'
import type { Article, ArticleParams } from '../../types/article'

interface ArticleListProps {
  articles: Article[]
  loading: boolean
  error?: string | null
  pagination: {
    currentPage: number
    totalPages: number
  }
  filters: ArticleParams
  onFilterChange: (newFilters: Partial<ArticleParams>) => void
  onPageChange: (page: number) => void
  onDelete?: (id: string) => void
}

const ArticleList = ({
  articles,
  loading,
  error,
  pagination,
  filters,
  onFilterChange,
  onPageChange,
  onDelete
}: ArticleListProps) => {
  if (loading && !articles.length) return <LoadingSpinner />
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <ArticleFilter
        filters={filters}
        onChange={onFilterChange}
        categories={[]} // Sesuaikan jika ada kategori
      /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onDelete={onDelete}
          />
        ))}
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default ArticleList
