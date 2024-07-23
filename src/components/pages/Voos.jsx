import { useEffect, useState } from "react"
import VooCard from '../voo/VooCard'

function Voos() {

    const [voos, setVoos] = useState({})

    useEffect(()=>{
        fetch("http://localhost:5000/voos", {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }
        ).then((data)=> data.json()
        ).then((data)=> {
            setVoos(data)
            console.log(data)
        })
    }, [])

    return (
        <div>
            <h1>Olá Mundo</h1>
        </div>
    )
}

export default Voos;