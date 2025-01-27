
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { SearchPage } from './components/SearchPage'
import { DrugDetailPage } from './components/DrugDetailPage';


function App() {
 

  return (
    <main>
     <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/drug/:id" element={<DrugDetailPage />} />
      </Routes>
    </Router>
    </main>
  )
}

export default App
