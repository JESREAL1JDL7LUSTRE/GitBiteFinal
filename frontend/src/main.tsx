import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './pages/Profile.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Payment from './pages/Payment.tsx'
import Order from './pages/Order.tsx'
import NotFound from './pages/NotFound.tsx'

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
  },
  {
    path: '/payment',
    element: <ProtectedRoute>
      <Payment/>
    </ProtectedRoute>
  },
  {
    path: '/order',
    element: <ProtectedRoute>
      <Order/>
    </ProtectedRoute>
  },
  {
    path: '*',
    element: <NotFound/>
  },
  {
    path: '/profile',
    element: <ProtectedRoute>
      <Profile/>
    </ProtectedRoute>
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
