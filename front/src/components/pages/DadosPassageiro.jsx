import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import useReservaContext from '../hook/useReservaContext'
import { useState, useEffect } from "react";
import useClienteContext from "../hook/useClienteContext";

function DadosPassageiro(){

    const { reserva, setReserva } = useReservaContext()
    const navigate = useNavigate()
    const [voo, setVoo] = useState(null)
    const {clienteAtual} = useClienteContext()

    useEffect(() => {
        fetch(`http://localhost:5000/voos/${reserva.id_voo}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then((data) => data.json())
        .then((data) => {
            setVoo(data)
            setReserva({...reserva, ['contaCliente']: clienteAtual.cpf})
        })
        .catch((err) => console.log('Erro ao carregar voo' + err))
    }, [])

    function handleOnChange(e){
        if(e.target.name === 'bagagem_extra' && !reserva.bagagem_extra){
            setReserva({...reserva, [e.target.name]: !reserva.bagagem_extra, ['preco']: reserva.preco + 100})
        }else if(e.target.name === 'bagagem_extra' && reserva.bagagem_extra){
            setReserva({...reserva, [e.target.name]: !reserva.bagagem_extra, ['preco']: reserva.preco - 100})
        }else {
            if(e.target.value === 'economica' && reserva.bagagem_extra === true){
                setReserva({...reserva, ['preco']: Number(voo.preco_vagas_economica) + 100, [e.target.name]: e.target.value})
            }else if(e.target.value === 'executiva' && reserva.bagagem_extra === true){
                setReserva({...reserva, ['preco']: Number(voo.preco_vagas_executiva) + 100, [e.target.name]: e.target.value})
            }else if(e.target.value === 'economica' && reserva.bagagem_extra === false){
                setReserva({...reserva, ['preco']: Number(voo.preco_vagas_economica), [e.target.name]: e.target.value})
            }else if(e.target.value === 'executiva' && reserva.bagagem_extra === false){
                setReserva({...reserva, ['preco']: Number(voo.preco_vagas_executiva), [e.target.name]: e.target.value})
            }else {
                setReserva({...reserva, [e.target.name]: e.target.value})
            }
        }
    }

    function submit(e){
        e.preventDefault()

        fetch('http://localhost:5000/reservas', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reserva)
        })
        .then((data) => data.json())
        .then((data) => {
            console.log(data)
    })
        navigate('/reservas')
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
                    type='radio'
                    name='vaga'
                    value='economica'
                    text='Vaga na classe econômica'
                    onChange={handleOnChange}
                />
                <Input
                    type='radio'
                    name='vaga'
                    value='executiva'
                    text='Vaga na classe executiva'
                    onChange={handleOnChange}
                />
                <Input
                    type='checkbox'
                    name='bagagem_extra'
                    text='Deseja uma bagagem de 25kg (EXTRA) - 100R$'
                    onChange={handleOnChange}
                />

                <SubmitButton text='Continuar'/>
            </form>
        </section>
    )
}

export default DadosPassageiro;