import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import type { ArticleParams } from '../../types/article';

interface ArticleFilterProps {
  filters: ArticleParams
  onChange: (filters: Partial<ArticleParams>) => void
  categories: string[]
}

const ArticleFilter = ({ filters, onChange, categories }: ArticleFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input
        placeholder="Search articles..."
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
        className="flex-grow"
      />

      <Select
        value={filters.category}
        onValueChange={(value) => onChange({ category: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.sort}
        onValueChange={(value) => onChange({ sort: value as 'asc' | 'desc' })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Newest First</SelectItem>
          <SelectItem value="asc">Oldest First</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() => onChange({ search: '', category: '', sort: 'desc' })}
      >
        Reset
      </Button>
    </div>
  )
}

export default ArticleFilter