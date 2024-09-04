import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import useVooContext from '../hook/useVooContext';


function Home(){

    const [viagem, setViagem] = useState({})

    const { voo, setVoo } = useVooContext()

    function handleOnChange(e){
        setViagem({...viagem, [e.target.name]: e.target.value})
        setVoo({...voo, [e.target.name]: e.target.value})
    }


    return (
        <section>
            <form>
                <Input
                    type='text'
                    name='origem'
                    text='Digite a origem do voo'
                    placeholder='Insira a origem'
                    onChange={handleOnChange}
                />
                <Input
                    type='text'
                    name='destino'
                    text='Digite o destino do voo'
                    placeholder='Insira o destino'
                    onChange={handleOnChange}
                />
                <Link to='/escolha-voo'>
                    <SubmitButton text='Continuar'/>
                </Link>
            </form>
        </section>
    )
}

export default Home;