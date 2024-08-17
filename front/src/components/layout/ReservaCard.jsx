import { useState, useEffect } from 'react'
import styles from '../voo/VooCard.module.css'

function ReservaCard({id, bagagem_extra, preco, id_voo, cpf, nome, idade, vaga}){

    const [voo, setVoo] = useState({})
    const [reserva, setReserva] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/voos/${id_voo}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then((data) => data.json())
        .then((data) => {
            setVoo(data)
        })
        .catch((err) => console.log('Erro ao pegar voo ' + err))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/reservas/${id}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then((data) => data.json())
        .then((data) => setReserva(data))
        .catch((err) => console.log('Erro ao pegar reserva ' + err))
    }, [reserva])

    async function pagar(e){
        e.preventDefault()
        let reserv = reserva
        reserv.status_pagamento = true
        await fetch(`http://localhost:5000/reservas/${id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reserv)
        })
        .then((data) => data.json())
        .then((data) => setReserva(data))
        .catch((err) => console.log('Erro ao atualizar reserva ' + err))
    }


    return(
        <div className={styles.vooCard}>
            <h4>{voo.origem} - {voo.destino}</h4>
            <p><span>Data da partida:</span> {voo.data_saida}</p>
            <p><span>Data da chegada:</span> {voo.data_chegada}</p>
            <p><span>Nome:</span> {nome}</p>
            <p><span>CPF:</span> {cpf}</p>
            <p><span>idade:</span> {idade}</p>
            <p><span>Bagagem extra:</span> {bagagem_extra}</p>
            <p><span>Vaga:</span> {vaga}</p>
            <p><span>Status Pagamento:</span> {reserva && reserva.status_pagamento ? 'Pago' : 'Não pago'}</p>
            <p><span>Preço:</span> R${preco}</p>
            {reserva && !reserva.status_pagamento && (
                <div>
                    <button onClick={pagar}>
                        Pagar Reserva
                    </button>
                </div>
            )}
        </div>
    )
}

export default ReservaCard;