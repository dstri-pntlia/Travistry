import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/layout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ArticlePage from './pages/ArticlePages'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/common/ProtectedRoute'
import ArticleDetail from './components/articles/ArticleDetail'
// import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
          <Route path="home" element={<HomePage />} />
          <Route path="articles" element={<ArticlePage />} />
          <Route path="/articles/:action" element={<ArticlePage />} />
          <Route path="/articles/:documentId/edit" element={<ArticlePage />} />
          <Route path="articles/detail/:documentId" element={<ArticleDetail />} />
        </Route>

        {/* 404 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  )
}

export default App