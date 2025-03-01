import './App.css'
import Featured from './components/Contents/Featured';
import Layout2 from './components/Contents/Layout';
import Products from './pages/Products';

interface AppProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function App({ searchQuery }: AppProps) {
  return (
    // Remove PlanToOrderProvider from here
    <Layout2>
      <Featured />
      <Products searchQuery={searchQuery} />
    </Layout2>
  )
}

export default App;
