import './App.css'
import FeaturedDish from './components/Contents/FeaturedDish';
import Layout from './components/Contents/Layout';
import Products from './components/Contents/Products';
import { PlanToOrderProvider } from './components/PopUps/Context/PlanToOrderContext'

interface AppProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function App({ searchQuery }: AppProps) {
  return (
    
    <PlanToOrderProvider>
      <Layout>
        <Products searchQuery={searchQuery} />
      </Layout>
    </PlanToOrderProvider>
  )
}

export default App;
