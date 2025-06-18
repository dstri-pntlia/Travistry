import { Link } from 'react-router-dom'
import type { Article } from '../../types/article'
import { formatDate } from '../../utils/constants'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Pencil, Trash2, Tag } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'

interface ArticleCardProps {
  article: Article
  onDelete?: (id: string) => void
  isOwner?: boolean
}

const ArticleCard = ({ article, onDelete }: ArticleCardProps) => {
  return (
    <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden">
      {article.cover_image_url && (
        <img
          src={article.cover_image_url}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      )}

      <CardHeader className="p-4">
        <CardTitle className="text-xl font-semibold line-clamp-2 hover:text-blue-700 transition-colors">
          <Link to={`/articles/${article.id}`}>
            {article.title}
          </Link>
        </CardTitle>

        <CardDescription className="mt-2 flex justify-between items-center text-sm text-gray-500">
          <span>{formatDate(article.createdAt)}</span>
          <span className="flex items-center gap-1 text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">
            <Tag className="w-3 h-3" /> {article.category}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow px-4 pb-4 text-gray-700">
        <p className="line-clamp-3">{article.description}</p>
      </CardContent>

      <CardFooter className="px-4 pb-4 flex justify-between items-center">
      <Button
        asChild
        variant="outline"
        className="text-sm rounded-full px-4 py-2 hover:bg-blue-50 transition"
      >
        <Link to={`/articles/detail/${article.documentId}`}>Read More</Link>
      </Button>

      <div className="flex items-center gap-2">
        {/* Edit Button with Tooltip */}
        <div className="relative group">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-full p-2 hover:bg-blue-100 transition-colors"
          >
            <Link to={`/articles/${article.documentId}/edit`}>
              <Pencil className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </Link>
          </Button>
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-700 text-white text-xs rounded px-2 py-1 transition-all">
            Edit
          </span>
        </div>

        {/* Delete Button with Tooltip & AlertDialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-2 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
              </Button>
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-700 text-white text-xs rounded px-2 py-1 transition-all">
                Delete
              </span>
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the article.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (article.documentId) {
                    onDelete?.(article.documentId)
                  }
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </CardFooter>

    </Card>
  )
}

export default ArticleCard
