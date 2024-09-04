import { useEffect, useState } from 'react'
import useClienteContext from '../hook/useClienteContext'
import ReservaCard from '../layout/ReservaCard'


function Reservas(){

    const [reservas, setReservas] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/reserva',{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((data) => {
            if(data.status===200){
                return data.json()
            }
        })
        .then((data) => {
            setReservas(data)
            console.log(data)
        })
    }, [])
    
    return(
        <div>
            {reservas && reservas.length>0 ? reservas.map((reserva) => (
                <ReservaCard 
                    id={reserva.id}
                    origem={reserva.voo.origem}
                    destino={reserva.voo.destino}
                    bagagem_extra={reserva.bagagem_extra === true ? 'Sim' : 'Não'}
                    preco={reserva.preco}
                    id_voo={reserva.id_voo}
                    cpf={reserva.cliente.cpf}
                    nome={reserva.cliente.nome}
                    idade={reserva.cliente.dataNascimento}
                    vaga={reserva.vaga}
                    data_saida={reserva.voo.saida}
                    data_chegada={reserva.voo.chegada}
                    key={reserva.id}
                />
            )): (
                <h3>Não há reservas</h3>
            )}
        </div>
    )
}

export default Reservas