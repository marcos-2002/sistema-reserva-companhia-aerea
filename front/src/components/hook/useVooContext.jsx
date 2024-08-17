import { useContext } from "react";
import { VooContext } from "../context/VooContext";

function useVooContext() {
    const context = useContext(VooContext)

    if(context === undefined) {
        throw new Error('Não está dentro do contexto.')
    }

    return context
}

export default useVooContext