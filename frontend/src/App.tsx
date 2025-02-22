import './App.css'
import ContentItems from './components/ContentItems'
import FeaturedDish from './components/FeaturedDish';
import { PlanToOrderProvider } from './components/PopUps/Context/PlanToOrderContext'
import PlanToOrderPopUp from './components/PopUps/PlanToOrderPopUp'

interface AppProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function App({ searchQuery }: AppProps) {
  return (
    <PlanToOrderProvider>
      <PlanToOrderPopUp />
      <FeaturedDish />
      <ContentItems searchQuery={searchQuery} />
    </PlanToOrderProvider>
  )
}

export default App;
