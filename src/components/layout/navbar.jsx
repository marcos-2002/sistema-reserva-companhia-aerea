import { Link } from "react-router-dom";
import styles from "./navbar.module.css"

function NavBar(){
    return (
        <header>
            <h1>Empresa de aviação</h1>
            <nav>
                <Link to={`/cadastro-voo`}>
                    Cadastro de Voos
                </Link>
                <Link to={`voos`}>Voos</Link>
                <a href="#">Passagens</a>
                <Link to={'/cadastro-cliente'}>Cadastro de Cliente</Link>
            </nav>
        </header>      
    )
}

export default NavBar;