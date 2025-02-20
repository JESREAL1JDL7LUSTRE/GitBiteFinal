import './App.css'
import ContentItems from './components/ContentItems'
import { PlanToOrderProvider } from './components/PopUps/Context/PlanToOrderContext'
import PlanToOrderPopUp from './components/PopUps/PlanToOrderPopUp'

interface AppProps {
  searchQuery: string;
}

function App({ searchQuery }: AppProps) {
  return (
    <div>
      <PlanToOrderProvider>
        <PlanToOrderPopUp />
        <ContentItems searchQuery={searchQuery} />
      </PlanToOrderProvider>
    </div>
  )
}

export default App;
