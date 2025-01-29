
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { SearchPage } from './scenes/SearchPage'
import { DetailPage } from './scenes/DetailPage';

function App() {
 
  return (
    <main>
     <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/drug/:id" element={<DetailPage />} />
      </Routes>
    </Router>
    </main>
  )
}

export default App
