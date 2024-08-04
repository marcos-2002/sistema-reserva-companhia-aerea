import { Link } from "react-router-dom";
import styles from "./navbar.module.css"

function NavBar(){
    return (
        <header>
            <Link to='/'><h1>Empresa de aviação</h1></Link>
            <nav>
                <Link to={`/cadastro-voo`}>Cadastro de Voos</Link>
                <Link to={`/voos`}>Voos</Link>
                <Link to={`/reservas`}>Reservas</Link>
                <Link to={'/cadastro-cliente'}>Cadastro de Cliente</Link>
            </nav>
        </header>      
    )
}

export default NavBar;