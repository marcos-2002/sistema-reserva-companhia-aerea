import { useEffect, useState } from "react"
import VooCard from '../voo/VooCard'

function Voos() {

    const [voos, setVoos] = useState({})

    useEffect(()=>{
        fetch("http://localhost:5000/voos", {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }
        ).then((data)=> data.json()
        ).then((data)=> {
            setVoos(data)
        })
    }, [])

    function handleRemove(id){
        fetch(`http://localhost:5000/voos/${id}`, {
            method:"DELETE",
            headers:{'Content-Type': 'application/json'},
        }).then((data)=>data.json()
        ).then((data)=>{
            console.log("Voo removido com SUCESSO! -- " + data)
            let voosAtualizados = voos
            voosAtualizados = voosAtualizados.filter((voo)=> voo.id !== id)
            setVoos(voosAtualizados)
        }
        ).catch((err)=>console.log("Erro ao remover voo  ---  " + err))
    }

    return (
        <div>
            {voos.length>0 && voos.map((voo) => {
                return (
                    <VooCard
                    origem={voo.origem}
                    destino={voo.destino}
                    data_partida={voo.data_saida} 
                    data_chegada={voo.data_chegada}
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