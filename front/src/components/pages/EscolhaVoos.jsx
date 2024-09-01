import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EscolhaVooCard from "../layout/EscolhaVooCard";
import useVooContext from "../hook/useVooContext";
import useReservaContext from "../hook/useReservaContext";

function EscolhaVoos(){

    const [voos, setVoos] = useState({})
    const {voo} = useVooContext()
    const {reserva, setReserva} = useReservaContext()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`http://localhost:8080/voos/search?origin=${voo.origem}&destination=${voo.destino}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).then((data)=>data.json())
        .then((data)=> {
            setVoos(data)
        })
    }, [])

    function handleSelect(id) {
        setReserva((reserva) => ({
            ...reserva,
            reservaRequestDTO: {
              ...reserva.reservaRequestDTO,
              ['voo']: id
            },
          }));

        navigate('/dados-passageiro')
    }

    

    return(
        <section>
            <h1>Escolha o seu Voo</h1>

            {voos.length>0 && voos.map((voo)=>{
                return (
                    <EscolhaVooCard 
                        origem={voo.origem}
                        destino={voo.destino}
                        data_partida={voo.saida}
                        data_chegada={voo.chegada}
                        id={voo.id}
                        handleSelect={handleSelect}
                        key={voo.id}
                />)
            })}
        </section>
    )
}

export default EscolhaVoos;