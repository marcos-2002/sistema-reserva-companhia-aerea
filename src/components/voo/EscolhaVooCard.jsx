import styles from './VooCard.module.css'
import { Link } from 'react-router-dom';

function EscolhaVooCard({id, origem, destino, data_partida, data_chegada, handleRemove}){

    function selecionarVoo(e){
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.vooCard}>
            <h4>{origem} - {destino}</h4>
            <p><span>Data da partida:</span> {data_partida}</p>
            <p><span>Data da chegada:</span> {data_chegada}</p>
            
            <div>
                <button onClick={selecionarVoo}>
                    Selecionar Voo
                </button>
            </div>
        </div>
    )
}

export default EscolhaVooCard;