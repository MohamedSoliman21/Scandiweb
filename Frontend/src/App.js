import Product_List from './Pages/Product_List';
import Add_Product from './Pages/Add_Product';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='Content'>
          <Routes>
            <Route exact path='/' element={<Product_List />} />              
            <Route path='/Add_Product' element={<Add_Product />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
