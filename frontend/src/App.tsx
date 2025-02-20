import './App.css'
import ContentItems from './components/ContentItems'
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
      <ContentItems searchQuery={searchQuery} />
    </PlanToOrderProvider>
  )
}

export default App;
