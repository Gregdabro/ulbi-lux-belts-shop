import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { Layout } from '@widgets/layout'

export const Router = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
