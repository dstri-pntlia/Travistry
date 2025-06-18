import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById } from '../../store/articlesSlice';
import LoadingSpinner from '../common/LoadingSpinner';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import type { AppDispatch } from '../../store/store';
import type { Article } from '../../types/article';

interface ArticleDetailProps {
  article?: Article;
  onDelete?: () => Promise<void>;
}

const ArticleDetail = ({ article, onDelete }: ArticleDetailProps) => {
  const { documentId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { currentArticle, loading, error } = useSelector((state: any) => state.articles);

  useEffect(() => {
    if (!article && documentId) {
      dispatch(fetchArticleById(documentId));
    }
  }, [dispatch, documentId, article]);

  const content = article ?? currentArticle;

  if (loading && !content) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!content) return <div>Article not found</div>;

  const shareUrl = window.location.href;
  console.log('onDelete prop:', onDelete)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-2 text-gray-800">{content.title}</h1>

      {/* Published date and category */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-4">
          <span>
            <strong>Published:</strong>{' '}
            {new Date(content.publishedAt ?? content.createdAt).toLocaleDateString()}
          </span>
          {content.updatedAt && (
            <span className="text-xs text-gray-500 italic">
              (Updated: {new Date(content.updatedAt).toLocaleDateString()})
            </span>
          )}
        </div>
        {content.category && (
          <span className="mt-2 sm:mt-0 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
            {content.category}
          </span>
        )}
      </div>

      {/* Description */}
      {content.description && (
        <p className="text-lg text-gray-700 mb-6">{content.description}</p>
      )}

      {/* Cover image */}
      {content.cover_image_url && (
        <img
          src={content.cover_image_url}
          alt={content.title}
          className="w-full h-96 object-cover rounded-lg mb-6 shadow-md"
        />
      )}

      {/* Content */}
      <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: content.content }} />

      {/* Delete Button */}
      {onDelete && (
        <div className="mt-6">
          <button onClick={onDelete} className="text-red-600 hover:underline font-medium">
            Delete this article
          </button>
        </div>
      )}

      {/* Divider */}
      <hr className="my-8 border-gray-300" />

      {/* Share Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Share this article:</h3>
        <div className="flex space-x-4">
          <FacebookShareButton url={shareUrl} title={content.title}>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              <FaFacebookF />
              <span>Facebook</span>
            </button>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={content.title}>
            <button className="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
              <FaTwitter />
              <span>Twitter</span>
            </button>
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={content.title}>
            <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              <FaWhatsapp />
              <span>WhatsApp</span>
            </button>
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
