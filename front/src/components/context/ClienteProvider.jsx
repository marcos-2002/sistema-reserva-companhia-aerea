import { ClienteContext } from "./ClienteContext";
import { useState, useEffect } from "react";

export function ClienteProvider({ children }) {
    const [clienteAtual, setClienteAtual] = useState(null);

    useEffect(() => {
        // Simulação de carregamento de dados
        const fetchCliente = async () => {
            // Aqui você deve buscar os dados reais do cliente
            // Por exemplo, uma chamada API
            // const response = await fetch('/api/cliente');
            // const data = await response.json();

            // Simulação com dados fictícios
            const data = { cpf: '123.456.789-00' };
            setClienteAtual(data);
        };

        fetchCliente();
    }, []);

    return (
        <ClienteContext.Provider value={{ clienteAtual, setClienteAtual }}>
            {children}
        </ClienteContext.Provider>
    );
}