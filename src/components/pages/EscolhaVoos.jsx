import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EscolhaVooCard from "../voo/EscolhaVooCard";
import useVooContext from "../hook/useVooContext";

function EscolhaVoos(){

    const [voos, setVoos] = useState({})
    const {voo} = useVooContext()

    useEffect(()=>{
        fetch('http://localhost:5000/voos', {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).then((data)=>data.json())
        .then((data)=> {
            let voosEscolhidos = data.filter((voos) => voos.origem === voo.origem && voos.destino === voo.destino)
            setVoos(voosEscolhidos)
        })
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
                        handleSelect=''
                        key={voo.id}
                />)
            })}
        </section>
    )
}

export default EscolhaVoos;