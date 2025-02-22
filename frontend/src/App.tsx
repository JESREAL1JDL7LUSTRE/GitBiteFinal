import './App.css'
import ContentItems from './components/Contents/ContentItems'
import FeaturedDish from './components/Contents/FeaturedDish';
import { PlanToOrderProvider } from './components/PopUps/Context/PlanToOrderContext'
import ProductGrid from './components/Contents/ProductGrid';
import PlanToOrderPopUp from './components/PopUps/PlanToOrderPopUp'

interface AppProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function App({ searchQuery }: AppProps) {
  return (
    <PlanToOrderProvider>
      <ProductGrid />
      <FeaturedDish />
      <ContentItems searchQuery={searchQuery} />
    </PlanToOrderProvider>
  )
}

export default App;
