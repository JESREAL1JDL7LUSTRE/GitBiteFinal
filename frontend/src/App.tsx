import './App.css'
import Featured from './components/Contents/Featured';
import Footer from './components/Contents/Footer';
import Layout2 from './components/Contents/Layout';
import Products from './pages/Products';


function App() {
  return (
    <Layout2>
      <Featured />
      <Products />
      <Footer />
    </Layout2>
  )
}

export default App;
