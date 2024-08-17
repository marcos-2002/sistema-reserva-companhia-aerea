import { useState } from "react";
import { ReservaContext } from "./ReservaContext";

export function ReservaProvider({ children }){
    const [reserva, setReserva] = useState({bagagem_extra: false, preco: 0, status_pagamento:false})

    return (
        <ReservaContext.Provider value={{reserva, setReserva}}>{children}</ReservaContext.Provider>
    )
}