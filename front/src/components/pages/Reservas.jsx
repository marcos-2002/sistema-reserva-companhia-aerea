import { useEffect, useState } from 'react'
import useClienteContext from '../hook/useClienteContext'
import ReservaCard from '../layout/ReservaCard'


function Reservas(){

    const {clienteAtual} = useClienteContext()
    const [reservas, setReservas] = useState(null)
    let listaReserva = []

    useEffect(() => {
        fetch('http://localhost:8080/reserva',{
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then((data) => {
            console.log(data)
            if(data.status===200){
            }
        })
        // Por enquanto está comentado
        // .then((data) => {
        //     data.map((dat) => {
        //         if(dat.contaCliente === clienteAtual.cpf){
        //             listaReserva.push(dat)
        //         }
        //     })
        //     setReservas(listaReserva)
        // })
    }, [])
    
    return(
        <div>
            {reservas && reservas.length>0 ? reservas.map((reserva) => (
                <ReservaCard 
                    id={reserva.id}
                    bagagem_extra={reserva.bagagem_extra === true ? 'Sim' : 'Não'}
                    preco={reserva.preco}
                    id_voo={reserva.id_voo}
                    cpf={reserva.cpf}
                    nome={reserva.nome}
                    idade={reserva.idade}
                    vaga={reserva.vaga}
                    key={reserva.id}
                />
            )): (
                <h3>Não há reservas</h3>
            )}
        </div>
    )
}

export default Reservas