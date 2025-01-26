
import './App.css'

function App() {
 

  return (
    <div className="page">

    <header>
      <h1>Buscador de Medicamentos</h1>
     <form className="form">
        <input type="text" placeholder="Search... " />
        <button type="submit">Search</button>
      </form>
    </header>
      
    <main>
      Resultados
    </main>
    </div>
  )
}
//https://api.fda.gov/drug/label.json?search=openfda.generic_name:%22Aspirin%22
export default App
