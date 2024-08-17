import { useEffect } from "react"

function ReservaCard({id, bagagem_extra, preco, id_voo, cpf, nome, idade, vaga, status_pagamento}){

    useEffect(() => {
        fetch(`http://localhost:5000/voos/${id_voo}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then((data) => data.json())
        .then((data) => console.log(data))
    }, [])

    return(
        <>
            <p>Foi</p>
        </>
    )
}

export default ReservaCard