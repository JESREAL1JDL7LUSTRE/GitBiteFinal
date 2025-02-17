import './App.css'
import ContentItems from './components/ContentItems'
import DesctopNavbar from './components/Navbar/DesctopNavbar'
import MobileNavbar from './components/Navbar/MobileNavbar'

function App() {

  return (
      <div> 
        <DesctopNavbar/>
        <MobileNavbar/>
        <div>
          <ContentItems/>
        </div>
      </div>  

  )
}

export default App
