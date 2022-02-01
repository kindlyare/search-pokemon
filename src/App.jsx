import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home'
import DetailsPokemon from './pages/DetailsPokemon/DetailsPokemon'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='details/:pokemonName' element={<DetailsPokemon />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
