import { useState } from "react";
import { ReservaContext } from "./ReservaContext";

export function ReservaProvider({ children }){
    const [reserva, setReserva] = useState(null)

    return (
        <ReservaContext.Provider value={{reserva, setReserva}}>{children}</ReservaContext.Provider>
    )
}