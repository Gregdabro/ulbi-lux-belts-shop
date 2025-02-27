import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './routes/Router'
import { AuthProvider } from './providers/AuthProvider'
import './styles/loader.css'
import { StoreDebug } from './debug/StoreDebug'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <StoreDebug />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
