import styles from '../voo/VooCard.module.css'

function EscolhaVooCard({id, origem, destino, data_partida, data_chegada, handleSelect, precoNormal, precoExecutiva}){

    function selecionarVoo(e){
        e.preventDefault()
        handleSelect(id)
    }

    return(
        <div className={styles.vooCard}>
            <h4>{origem} - {destino}</h4>
            <p><span>Data da partida:</span> {data_partida}</p>
            <p><span>Data da chegada:</span> {data_chegada}</p>
            <p><span>Preço Econômica:</span> R$ {precoNormal.toFixed(2)}</p>
            <p><span>Preço Executiva:</span> R$ {precoExecutiva.toFixed(2)}</p>
            
            <div>
                <button onClick={selecionarVoo}>
                    Selecionar Voo
                </button>
            </div>
        </div>
    )
}

export default EscolhaVooCard;