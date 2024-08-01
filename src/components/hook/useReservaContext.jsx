import { useContext } from "react";
import { ReservaContext } from "../context/ReservaContext";

function useReservaContext(){
    const context = useContext(ReservaContext)

    if(context === undefined) {
        throw new Error('Não está dentro do contexto.')
    }

    return context
}

export default useReservaContext