import { useState } from "react";
import { VooContext } from "./VooContext";

export default function VooProvider({ children }) {
    
    const [voo, setVoo] = useState(null)
    
    return (
        <VooContext.Provider value={{voo, setVoo}}>
            { children }
        </VooContext.Provider>
    )
}