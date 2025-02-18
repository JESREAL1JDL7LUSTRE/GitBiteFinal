import './App.css'
import ContentItems from './components/ContentItems'
import { PlanToOrderProvider } from './components/PopUps/Context/PlanToOrderContext'
import PlanToOrderPopUp from './components/PopUps/PlanToOrderPopUp'

function App() {

  return (
        <div>
          
          <PlanToOrderProvider>
          <div className="">
            <PlanToOrderPopUp/>
            <div className="">
              <ContentItems/>
              </div>
          </div>
          </PlanToOrderProvider>
          
        </div>

  )
}

export default App
