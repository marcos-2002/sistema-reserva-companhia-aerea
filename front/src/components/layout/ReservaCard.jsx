import { useState, useEffect } from 'react'
import styles from '../voo/VooCard.module.css'
import { useNavigate } from 'react-router-dom'

function ReservaCard({id, origem, destino, bagagem_extra, preco, cpf, nome, idade, vaga, data_saida, data_chegada}){

    const [reserva, setReserva] = useState(null)
    const navigate = useNavigate()

    async function pagar(e){
        e.preventDefault()
    }


    return(
        <div className={styles.vooCard}>
            <h4>{origem} - {destino}</h4>
            <p><span>Data da partida:</span> {data_saida}</p>
            <p><span>Data da chegada:</span> {data_chegada}</p>
            <p><span>Nome:</span> {nome}</p>
            <p><span>CPF:</span> {cpf}</p>
            <p><span>Data de nascimento:</span> {idade}</p>
            <p><span>Bagagem extra:</span> {bagagem_extra}</p>
            <p><span>Preço:</span> R${preco}</p>
        </div>
    )
}

export default ReservaCard;