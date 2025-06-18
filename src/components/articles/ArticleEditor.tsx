import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import LoadingSpinner from '../common/LoadingSpinner'
import { useNavigate } from 'react-router-dom'




const articleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(15, 'description must be at least 15 characters'),
  // category: z.coerce.number().min(1, 'Category must be a positive number').optional(),
  cover_image_url: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export type ArticleFormData = z.infer<typeof articleSchema>

interface ArticleEditorProps {
  initialData?: Partial<ArticleFormData>
  onSubmit: (data: ArticleFormData) => void
  loading: boolean
  error?: string
}

const ArticleEditor = ({
  initialData,
  onSubmit,
  loading,
  error,
}: ArticleEditorProps) => {
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      // category: initialData?.category || 0,
      cover_image_url: initialData?.cover_image_url || '',
    },
  })
const navigate = useNavigate()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Your article title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g. 1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="cover_image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your travel experience here..."
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
            <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/articles')}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner size="small" /> : 'Save Article'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ArticleEditor