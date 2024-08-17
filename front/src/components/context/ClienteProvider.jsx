import { ClienteContext } from "./ClienteContext";
import { useState } from "react";

export function ClienteProvider({ children }){
    const [clienteAtual, setClienteAtual] = useState(null)
    
    return (
        <ClienteContext.Provider value={{clienteAtual, setClienteAtual}}>{children}</ClienteContext.Provider>
    )
}