import './App.css'
import { Outlet } from 'react-router-dom';
import NavBar from './components/layout/navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';

function App() {
  

  return (
    <div id="main">
        <NavBar/>
        <div>
        <Container>
          <Outlet />
        </Container>
        </div>
        <div id="content"></div>
        <Footer/>
    </div>
  )
}

export default App
