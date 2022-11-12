import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Poslastica from './pages/poslastice/Poslastica';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/home' element={<Home />} /> 
        <Route path="/create" element={<Create />} />
        <Route path="/search" element={<Search />} />
        <Route path="/poslastice/:id" element={<Poslastica />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
