import './App.css';
import { QueryProvider } from './app/providers/QueryProvider.tsx';
import AppRouter from './app/routes';
import GlobalErrorFallback from './components/common/GlobalErrorFallback.tsx';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
