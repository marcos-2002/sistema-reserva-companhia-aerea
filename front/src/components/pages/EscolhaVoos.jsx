import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EscolhaVooCard from "../layout/EscolhaVooCard";
import useVooContext from "../hook/useVooContext";
import useReservaContext from "../hook/useReservaContext";

function EscolhaVoos() {
    const [voos, setVoos] = useState([]);
    const [orderBy, setOrderBy] = useState("");
    const { voo } = useVooContext();
    const { reserva, setReserva } = useReservaContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/voos/search?origin=${voo.origem}&destination=${voo.destino}${orderBy ? `&orderBy=${orderBy}` : ''}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setVoos(data);
        })
        .catch((err) => console.log("Erro ao carregar voos  ---  " + err));
    }, [voo.origem, voo.destino, orderBy]);

    function handleSelect(id) {
        setReserva((reserva) => ({
            ...reserva,
            reservaRequestDTO: {
                ...reserva.reservaRequestDTO,
                voo: id
            }
        }));
        navigate('/dados-passageiro');
    }

    return (
        <section>
            <h1>Escolha o seu Voo</h1>

            <div>
                <button class="btn" onClick={() => setOrderBy("preco")}>Ordenar por Preço</button>
                <button class="btn" onClick={() => setOrderBy("horario")}>Ordenar por Horário</button>
                
            </div>

            {voos.length > 0 ? (
                voos.map((voo) => (
                    <EscolhaVooCard
                        origem={voo.origem}
                        destino={voo.destino}
                        data_partida={voo.saida}
                        data_chegada={voo.chegada}
                        precoNormal={voo.preçoNormal}
                        precoExecutiva={voo.preçoExecutiva}
                        id={voo.id}
                        handleSelect={handleSelect}
                        key={voo.id}
                    />
                ))
            ) : (
                <p>Não há voos disponíveis.</p>
            )}
        </section>
    );
}

export default EscolhaVoos;
