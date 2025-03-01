import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@pages/ui/homePage/HomePage'
import { AuthPage } from '@pages/ui/authPage/AuthPage'
import { Layout } from '@widgets/layout'
import { UserProfile } from '@pages/ui/userProfile/UserProfile'
import { AdminPage } from '@pages/ui/admin/AdminPage'
import { ProductsPage } from '@pages/ui/products/ProductsPage'
import { ProductDetailsPage } from '@pages/ui/productDetails/ProductDetailsPage'
import { ProtectedRoute } from './ProtectedRoute'
import { APP_ROUTES, USER_ROLES } from '@shared/config/constants'

export const Router = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path={APP_ROUTES.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={APP_ROUTES.AUTH.slice(1)} element={<AuthPage />} />
          <Route path={APP_ROUTES.PRODUCTS.slice(1)} element={<ProductsPage />} />
          <Route path={APP_ROUTES.PRODUCT_DETAILS.slice(1)} element={<ProductDetailsPage />} />
          <Route path={APP_ROUTES.PROFILE.slice(1)} element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path={APP_ROUTES.ADMIN.slice(1)} element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <AdminPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
