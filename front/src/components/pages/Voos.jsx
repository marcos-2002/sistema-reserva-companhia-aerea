import { useEffect, useState } from "react"
import VooCard from '../voo/VooCard'

function Voos() {

    const [voos, setVoos] = useState({})

    useEffect(()=>{
        fetch("http://localhost:8080/voos", {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }
        ).then((data)=> data.json()
        ).then((data)=> {
            setVoos(data)
        })
    }, [voos])

    function handleRemove(id){
        fetch(`http://localhost:8080/voos/${id}`, {
            method:"DELETE"
        })
        .catch((err)=>console.log("Erro ao remover voo  ---  " + err))
    }

    return (
        <div>
            {voos.length>0 && voos.map((voo) => {
                return (
                    <VooCard
                    origem={voo.origem}
                    destino={voo.destino}
                    data_partida={voo.saida} 
                    data_chegada={voo.chegada}
                    id={voo.id}
                    handleRemove={handleRemove}
                    key={voo.id}
                />
                )
            })}
        </div>
    )
}

export default Voos;