import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Themeroutes from './routes/Router';
import './App.css'
import './assets/scss/style.scss';


function App() {

  const routing = useRoutes(Themeroutes);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="ltr" dir="ltr">
        {routing}
      </div>
    </QueryClientProvider>
  )
}

export default App
