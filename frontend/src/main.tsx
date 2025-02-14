import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './pages/Profile.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/profile/:id',
    element: <Profile/>
  },
  {
    path: '/signin',
    element: <SignIn/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
