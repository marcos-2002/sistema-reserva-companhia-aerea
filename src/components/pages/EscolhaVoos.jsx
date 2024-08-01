import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EscolhaVooCard from "../voo/EscolhaVooCard";

function EscolhaVoos(){

    const [voos, setVoos] = useState({})

    useEffect(()=>{
        fetch('http://localhost:5000/voos', {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).then((data)=>data.json())
        .then((data)=> setVoos(data))
    }, [])

    return(
        <section>
            <h1>Escolha o seu Voo</h1>

            {voos.length>0 && voos.map((voo)=>{
                return (
                    <EscolhaVooCard 
                        origem={voo.origem}
                        destino={voo.destino}
                        data_partida={voo.data_saida}
                        data_chegada={voo.data_chegada}
                        id={voo.id}
                        handleRemove=''
                        key={voo.id}
                />)
            })}

            <Link to='/dados-passageiro'>
                <button>
                    Continuar
                </button>
            </Link>
        </section>
    )
}

export default EscolhaVoos;