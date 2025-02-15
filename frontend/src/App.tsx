import { useNavigate } from 'react-router-dom'
import './App.css'
import ContentItems from './components/ContentItems'
import SignOut from './components/Sign/SignOut'
import DesctopNavbar from './components/Navbar/DesctopNavbar'
import MobileNavbar from './components/Navbar/MobileNavbar'

function App() {

  const nav = useNavigate()
  return (
      <div> 
        <DesctopNavbar/>
        <MobileNavbar/>
        <div>
          <button onClick={() => {
            nav("/signin")
          }}> signin </button>
        </div>

        <div>
          <button onClick={() => {
            nav("/signup")
          }}> signup </button>
        </div>

        <div>
          <ContentItems/>
        </div>
        <div>
          <button onClick={() => {
            nav("/profile")
          }}> profile </button>
        </div>
        <div>
          <button onClick={() => {
            nav("/order")
          }}> order </button>
        </div>
        <div>
          <button onClick={() => {
            nav("/payment")
          }}> Previous Payment </button>
        </div>
        <div>
          <button onClick={() => {
            nav("/cart")
          }}> cart </button>
        </div>
          <SignOut/>


      </div>  

  )
}

export default App
