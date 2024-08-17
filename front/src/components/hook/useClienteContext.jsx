import { useContext } from "react";
import { ClienteContext } from "../context/ClienteContext";

function useClienteContext(){
    const context = useContext(ClienteContext)

    if(context === undefined){
        throw new Error('Não está dentro do contexto')
    }

    return context
}

export default useClienteContext