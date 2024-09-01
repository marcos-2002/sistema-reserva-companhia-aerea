import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import useReservaContext from '../hook/useReservaContext'
import { useState, useEffect } from "react";
import useClienteContext from "../hook/useClienteContext";

function DadosPassageiro(){

    const { reserva, setReserva } = useReservaContext()
    console.log(reserva)
    const navigate = useNavigate()
    const [voo, setVoo] = useState(null)
    const {clienteAtual} = useClienteContext()
    const [tipoPagamento, setTipoPagamento] = useState('')

    // useEffect(() => {
    //     fetch(`http://localhost:5000/voos/${reserva.id_voo}`, {
    //         method: "GET",
    //         headers: {'Content-Type': 'application/json'}
    //     })
    //     .then((data) => data.json())
    //     .then((data) => {
    //         setVoo(data)
    //         setReserva({...reserva, ['contaCliente']: clienteAtual.cpf})
    //     })
    //     .catch((err) => console.log('Erro ao carregar voo' + err))
    // }, [])

    function handleOnChange(e){
        if (e.target.name === 'bagagem_extra') {
            setReserva(
                {...reserva, 
                    reservaRequestDTO: 
                    {...reserva.reservaRequestDTO, 
                        ['bagagemExtra']: !reserva.reservaRequestDTO.bagagemExtra}})
        }
        else if (e.target.value === 'economica') {
            console.log('economica')
            setReserva(
                {...reserva, 
                    reservaRequestDTO: 
                    {...reserva.reservaRequestDTO, 
                        ['tipo']: 'economica'}})
        }
        else if (e.target.value === 'executiva') {
            setReserva(
                {...reserva, 
                    reservaRequestDTO: 
                    {...reserva.reservaRequestDTO, 
                        ['tipo']: 'executiva'}})
        }
        else if (e.target.value === 'boleto') {
            setReserva(
                {...reserva, 
                    pagamentoRequestWrapper: 
                    {
                        ['tipo']: 'boleto',
                        ['dados']: {
                            ['codigoBoleto']: '00190500954014481606906809350314337370000000100'}
                    }})
            setTipoPagamento('boleto')
        }
        else if (e.target.value === 'cartao') {
            setReserva(
                {...reserva, 
                    pagamentoRequestWrapper: {['tipo']: 'cartao'}})
            setTipoPagamento('cartao')
        }
        else if (e.target.name === 'nomeTitular' || e.target.name === 'numeroCartao' || e.target.name === 'cvv') {
            setReserva(
                {...reserva, 
                    pagamentoRequestWrapper: 
                    {...reserva.pagamentoRequestWrapper, 
                        dados: {...reserva.pagamentoRequestWrapper.dados, [e.target.name]: e.target.value}}})
        }
        console.log(e.target.name)
        console.log(reserva)
    }

    function submit(e) {
        e.preventDefault();

        fetch('http://localhost:8080/reserva/pagamento', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // A chave do token deve ser corretamente capitalizada e o token deve ser recuperado corretamente.
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(reserva)
        })
        .then(response => {
            if (!response.ok) {
                // Exibe o status e o corpo da resposta em caso de erro
                response.json().then(errorData => console.log('Erro:', response.status, errorData));
            } else {
                return response.json();
            }
        })
        .catch((err) => console.log('Erro ao enviar a reserva: ' + err));
    }

    return (
        <section>
            <form onSubmit={submit}>
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
                    text='Deseja uma bagagem de 25kg (EXTRA)'
                    onChange={handleOnChange}
                />

                <Input
                    type='radio'
                    name='formaPagamento'
                    value='boleto'
                    text='Pagar com boleto'
                    onChange={handleOnChange}
                />
                <Input
                    type='radio'
                    name='formaPagamento'
                    value='cartao'
                    text='Pagar com cartão'
                    onChange={handleOnChange}
                />

                {tipoPagamento !== undefined && tipoPagamento === 'cartao' ? (
                    <>
                        <Input
                            type='text'
                            name='numeroCartao'
                            text='Insira o número do cartão'
                            placeholder='0000 1111 2222 3333'
                            onChange={handleOnChange}
                        />
                        <Input
                            type='text'
                            name='nomeTitular'
                            text='Insira o nome do titular do cartão'
                            placeholder='Miguel da Silva'
                            onChange={handleOnChange}
                        />
                        <Input
                            type='text'
                            name='cvv'
                            text='Insira cvv do cartão'
                            placeholder='123'
                            onChange={handleOnChange}
                        />
                    </>
                ) : (<></>)}

                <SubmitButton text='Continuar'/>
            </form>
        </section>
    )
}

export default DadosPassageiro;