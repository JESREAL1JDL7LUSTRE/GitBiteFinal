import './App.css'
import Featured from './components/Contents/Featured';
import Layout2 from './components/Contents/Layout';
import Products from './pages/Products';


function App() {
  return (
    // Remove PlanToOrderProvider from here
    <Layout2>
      <Featured />
      <Products />
    </Layout2>
  )
}

export default App;
