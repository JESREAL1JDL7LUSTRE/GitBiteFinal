import './App.css'
import Featured from './components/Contents/Featured';
import Layout2 from './components/Contents/Layout';
import Products from './components/Contents/Products';
import { PlanToOrderProvider } from './components/PopUps/Context/PlanToOrderContext';

interface AppProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function App({ searchQuery }: AppProps) {
  return (

    <PlanToOrderProvider>
      <Layout2>
        <Featured />
        <Products searchQuery={searchQuery} />
      </Layout2>
    </PlanToOrderProvider>
  )
}

export default App;
