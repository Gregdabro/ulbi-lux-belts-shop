import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@pages/ui/homePage/HomePage'
import { AuthPage } from '@pages/ui/authPage/AuthPage'
import { Layout } from '@widgets/layout'
import { UserProfile } from '@pages/ui/userProfile/UserProfile'
import { AdminPage } from '@pages/ui/admin/AdminPage'
import { ProductsPage } from '@pages/ui/products/ProductsPage'
import { ProductDetailsPage } from '@pages/ui/productDetails/ProductDetailsPage'
import { ProtectedRoute } from './ProtectedRoute'

export const Router = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="admin" element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
