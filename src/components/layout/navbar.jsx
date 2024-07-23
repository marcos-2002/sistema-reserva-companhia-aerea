import { Link } from "react-router-dom";
import styles from "./navbar.module.css"

function NavBar(){
    return (
        <header>
            <h1>Empresa de aviação</h1>
            <nav>
                <Link to={`/empresas`}>
                    Empresas
                </Link>
                <Link to={`voos`}>Voos</Link>
                <a href="#">Passagens</a>
                <a href="#">Sobre</a>
            </nav>
        </header>      
    )
}

export default NavBar;