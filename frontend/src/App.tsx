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
          <div className="">
            <PlanToOrderPopUp/>
            <div className="">
              <ContentItems searchQuery={searchQuery}/>
              </div>
          </div>
          </PlanToOrderProvider>
          
        </div>

  )
}

export default App
