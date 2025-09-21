import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Productview from './pages/product/Productview'
import Navbar from "./components/Navbar";
import SalesForm from "./components/form/sales/SalesForm";


function App() {
 
  return (
    <>
   <Router>
      <Navbar/>
      <main className="p-6">
        <Routes>
          
          <Route path="/" element={<Productview />} />
          <Route path="/sale" element={<SalesForm/>} />
        
        </Routes>
      </main>
    </Router>
    </>
  )
}

export default App
