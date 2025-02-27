import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './routes/Router'
import { AuthProvider } from './providers/AuthProvider'

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
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
