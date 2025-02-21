
import { useNavigate } from 'react-router-dom'

const NavbarMenu = () => {
  const nav = useNavigate()
  return (
    <li className='flex flex-col p-4 gap-2'>
        <div >
          <button onClick={() => {
            nav("/profile")
          }}> Profile </button>
        </div>
        <div>
          <button onClick={() => {
            nav("/order")
          }}> Previous order </button>
        </div>
        <div>
          <button onClick={() => {
            nav("/payment")
          }}> Previous Payment </button>
        </div>
        <div>
          <button onClick={() => {
            nav("/previousorder")
          }}> Ordered </button>
        </div>
    </li>
  )
}

export default NavbarMenu
