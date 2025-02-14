import { useNavigate } from 'react-router-dom'
import './App.css'
import ContentItems from './components/ContentItems'

function App() {

  const nav = useNavigate()
  return (
      <div> 
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


      </div>  

  )
}

export default App
