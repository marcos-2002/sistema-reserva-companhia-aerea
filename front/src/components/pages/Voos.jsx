import { useEffect, useState } from "react";
import VooCard from '../voo/VooCard';

function Voos() {
    const [voos, setVoos] = useState([]);
    const [orderBy, setOrderBy] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/voos${orderBy ? `?orderBy=${orderBy}` : ''}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then((data) => data.json())
        .then((data) => {
            setVoos(data);
        })
        .catch((err) => console.log("Erro ao carregar voos  ---  " + err));
    }, [orderBy]);

    function handleRemove(id) {
        fetch(`http://localhost:8080/voos/${id}`, {
            method:"DELETE"
        })
        .then(() => {
            setVoos(voos.filter(voo => voo.id !== id));
        })
        .catch((err) => console.log("Erro ao remover voo  ---  " + err));
    }

    return (
        <div>
            <div>
                <button className="btn" onClick={() => setOrderBy("preco")}>Ordenar por Preço</button>
                <button className="btn" onClick={() => setOrderBy("horario")}>Ordenar por Horário</button>
            </div>
            {voos.length > 0 && voos.map((voo) => (
                <VooCard
                    origem={voo.origem}
                    destino={voo.destino}
                    data_partida={voo.saida} 
                    data_chegada={voo.chegada}
                    precoNormal={voo.preçoNormal}
                    precoExecutiva={voo.preçoExecutiva}
                    id={voo.id}
                    handleRemove={handleRemove}
                    key={voo.id}
                />
            ))}
        </div>
    );
}

export default Voos;
