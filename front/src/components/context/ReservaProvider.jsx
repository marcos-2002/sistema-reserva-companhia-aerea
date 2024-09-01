import { useState } from "react";
import { ReservaContext } from "./ReservaContext";

export function ReservaProvider({ children }){
    const [reserva, setReserva] = useState({reservaRequestDTO:{bagagemExtra: false}, pagamentoRequestWrapper: {}})

    return (
        <ReservaContext.Provider value={{reserva, setReserva}}>{children}</ReservaContext.Provider>
    )
}