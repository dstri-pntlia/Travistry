// store/articlesSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../api/client';
import type { Article, ArticleParams } from '../types/article';

interface ArticlesState {
  data: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

const initialState: ArticlesState = {
  data: [],
  currentArticle: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const fetchArticles = createAsyncThunk(
      'articles/fetchArticles',
      async (params: ArticleParams, { rejectWithValue }) => {
        try {
          const response = await client.get('/articles', {
           params: {
            'pagination[page]': params.page ?? 1,
            'pagination[pageSize]': params.pageSize ?? 15,
            populate: '*',
          },
          });

      const articles = response.data.data.map((item: any): Article => ({
        id: String(item.id),
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        category: item.category?.name || '',
        cover_image_url: item.cover_image_url,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        createdBy: {
          id: String(item.user?.id),
          name: item.user?.username || '',
          email: item.user?.email || '',
        },
      }));

      return {
        data: articles,
        currentPage: response.data.meta.pagination.page,
        totalPages: response.data.meta.pagination.pageCount,
        totalItems: response.data.meta.pagination.total,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch articles');
    }
  }
);


export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (documentId: string, { rejectWithValue }) => {
    try {
      const response = await client.get('/articles/' + documentId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch article');
    }
  }
);

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>, { rejectWithValue }) => {
    try {
      console.log("Payload yang dikirim:", articleData);
      const response = await client.post('/articles', {data: articleData});
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create article');
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ documentId, data }: { documentId: string; data: Partial<Article> }, { rejectWithValue }) => {
    try {
      const response = await client.put('/articles/' + documentId, {data: data});
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update article');
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (documentId: string, { rejectWithValue }) => {
    try {
      await client.delete('/articles/' + documentId);
      return documentId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete article');
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearCurrentArticle(state) {
      state.currentArticle = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch articles
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch article by id
      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentArticle = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create article
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update article
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        if (state.currentArticle?.id === action.payload.id) {
          state.currentArticle = action.payload;
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete article
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.id !== action.payload);
        if (state.currentArticle?.id === action.payload) {
          state.currentArticle = null;
        }
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions
export const { clearCurrentArticle, clearError } = articlesSlice.actions;

// Reducer
export default articlesSlice.reducer;

