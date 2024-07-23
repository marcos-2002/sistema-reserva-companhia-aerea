import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/navbar';
import Voo from './components/voo/voo';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Voos from './components/pages/Voos';

function App() {
  

  return (
    <>
      <Router>
        <NavBar/>
        <div>
          <Container>
            <Routes>
                <Route path="/empresas" element={<Voo/>} />
                <Route path="/voos" element={<Voos/>} />
            </Routes>
          </Container>
        </div>
        <Footer/>
      </Router>
    </>
  )
}

export default App
