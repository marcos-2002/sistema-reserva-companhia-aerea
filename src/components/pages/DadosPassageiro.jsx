import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import useReservaContext from '../hook/useReservaContext'
import { useState } from "react";

function DadosPassageiro(){

    const { reserva, setReserva } = useReservaContext()
    const [bagagemExtra, setBagagemExtra] = useState(true)
    const navigate = useNavigate()
    
    function handleOnChange(e){
        setReserva({...reserva, [e.target.name]: e.target.value})
        console.log(reserva)
    }

    function handleOnChangeBagagem(e) {
        setBagagemExtra(()=>!bagagemExtra)
        console.log(bagagemExtra)
        setReserva({...reserva, [e.target.name]: bagagemExtra})
        console.log(reserva)
    }

    function submit(){
        // TENHO QUE TERMINAR ESSA FUNÇÃO
        // navigate('')
    }

    return (
        <section>
            <form onSubmit={submit}>
                <Input
                    type='text'
                    name='cpf'
                    text='Digite o CPF do passageiro'
                    placeholder='Insira o CPF'
                    onChange={handleOnChange}
                />
                <Input
                    type='text'
                    name='nome'
                    text='Digite o nome completo do passageiro'
                    placeholder='Insira o nome'
                    onChange={handleOnChange}
                />
                <Input
                    type='number'
                    name='idade'
                    text='Digite a idade do passageiro'
                    placeholder='Insira a idade'
                    onChange={handleOnChange}
                />

                <Input
                    type='checkbox'
                    name='bagagem_extra'
                    text='Deseja uma bagagem de 25kg (EXTRA) - 100R$'
                    placeholder='Insira a idade'
                    onChange={handleOnChangeBagagem}
                />

                <SubmitButton text='Continuar'/>
            </form>
        </section>
    )
}

export default DadosPassageiro;