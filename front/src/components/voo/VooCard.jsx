import styles from './VooCard.module.css'
import { useNavigate } from 'react-router-dom'

function VooCard({id, origem, destino, data_partida, data_chegada, handleRemove}){

    const navigate = useNavigate()

    function remove(e){
        e.preventDefault()
        handleRemove(id)
    }

    function editar(e){
        e.preventDefault()
        navigate(`/editar-voo/${id}`)
    }

    return(
        <div className={styles.vooCard}>
            <h4>{origem} - {destino}</h4>
            <p><span>Data da partida:</span> {data_partida.split(' ')[0]}</p>
            <p><span>Data da chegada:</span> {data_chegada.split(' ')[0]}</p>
            <div>
                {/* <Link to={`/voo/${id}`}>
                    <BsPencil/> Editar
                </Link>
                */}
                <button onClick={remove}>
                    Excluir
                </button>
                <button onClick={editar}>
                    Editar
                </button>
            </div>
        </div>
    )
}

export default VooCard;