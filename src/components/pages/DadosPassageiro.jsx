import { Link } from "react-router-dom";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import useReservaContext from '../hook/useReservaContext'

function DadosPassageiro(){

    function handleOnChange(e){
        
    }

    const { reserva } = useReservaContext()

    console.log(reserva)

    return (
        <section>
            <form>
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
                    type='text'
                    name='idade'
                    text='Digite a idade do passageiro'
                    placeholder='Insira a idade'
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
                    onChange={handleOnChange}
                />


                <Link to='/dados-passageiro'>
                    <SubmitButton text='Continuar'/>
                </Link>
            </form>
        </section>
    )
}

export default DadosPassageiro;