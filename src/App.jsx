import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/navbar';
import Voo from './components/voo/voo';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Voos from './components/pages/Voos';
import Cliente from './components/cliente/Cliente';

function App() {
  

  return (
    <>
      <Router>
        <NavBar/>
        <div>
          <Container>
            <Routes>
                <Route path="/cadastro-voo" element={<Voo/>} />
                <Route path="/voos" element={<Voos/>} />
                <Route path="/cadastro-cliente" element={<Cliente/>} />
            </Routes>
          </Container>
        </div>
        <Footer/>
      </Router>
    </>
  )
}

export default App
