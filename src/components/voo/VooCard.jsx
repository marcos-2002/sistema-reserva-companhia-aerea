import styles from './VooCard.module.css'
import { Link } from 'react-router-dom';

function VooCard({id, origem, destino, data_partida, data_chegada, handleRemove}){

    function remove(e){
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.vooCard}>
            <h4>{origem} - {destino}</h4>
            <p><span>Data da partida:</span> {data_partida}</p>
            <p><span>Data da chegada:</span> {data_chegada}</p>
            {/* <p><span className={`${styles[category.toLowerCase()]}`}></span>{category}</p> */}
            <div>
                {/* <Link to={`/voo/${id}`}>
                    <BsPencil/> Editar
                </Link>
                */}
                <button onClick={remove}>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default VooCard;