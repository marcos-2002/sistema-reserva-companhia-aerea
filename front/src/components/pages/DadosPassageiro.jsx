import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import useReservaContext from '../hook/useReservaContext';
import { useState, useEffect } from "react";
import useClienteContext from "../hook/useClienteContext";

function DadosPassageiro() {
    const { reserva, setReserva } = useReservaContext();
    const navigate = useNavigate();
    const [voo, setVoo] = useState(null);
    const { clienteAtual } = useClienteContext();
    const [tipoPagamento, setTipoPagamento] = useState('');

    useEffect(() => {
        if (reserva.id_voo) {
            fetch(`http://localhost:8080/voos/${reserva.id_voo}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                setVoo(data);
                setReserva(prevReserva => ({ 
                    ...prevReserva, 
                    reservaRequestDTO: { 
                        ...prevReserva.reservaRequestDTO, 
                        contaCliente: clienteAtual?.cpf 
                    } 
                }));
            })
            .catch(err => console.log('Erro ao carregar voo:', err));
        }
    }, [reserva.id_voo, clienteAtual, setReserva]);

    function handleOnChange(e) {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'bagagem_extra') {
            setReserva(prevReserva => ({
                ...prevReserva,
                reservaRequestDTO: {
                    ...prevReserva.reservaRequestDTO,
                    bagagemExtra: !prevReserva.reservaRequestDTO.bagagemExtra
                }
            }));
        } else if (type === 'radio') {
            if (value === 'economica' || value === 'executiva') {
                setReserva(prevReserva => ({
                    ...prevReserva,
                    reservaRequestDTO: { ...prevReserva.reservaRequestDTO, tipo: value }
                }));
            } else if (value === 'boleto' || value === 'cartao') {
                setReserva(prevReserva => ({
                    ...prevReserva,
                    pagamentoRequestWrapper: {
                        tipo: value,
                        dados: value === 'boleto' ? { codigoBoleto: '00190500954014481606906809350314337370000000100' } : {}
                    }
                }));
                setTipoPagamento(value);
            }
        } else if (['nomeTitular', 'numeroCartao', 'cvv'].includes(name)) {
            setReserva(prevReserva => ({
                ...prevReserva,
                pagamentoRequestWrapper: {
                    ...prevReserva.pagamentoRequestWrapper,
                    dados: { ...prevReserva.pagamentoRequestWrapper.dados, [name]: value }
                }
            }));
        }
    }

    function submit(e) {
        e.preventDefault();
        console.log("Enviando reserva:", JSON.stringify(reserva));

        fetch('http://localhost:8080/reserva/pagamento', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(reserva)
        })
        .then(response => {
            if (!response.ok) {
                response.text().then(errorText => console.log('Erro:', response.status, errorText));
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data) {
                console.log("asoidghasdih")
                navigate('/reservas'); // Navegar para a página de confirmação após sucesso
            }
        })
        .catch(err => console.log('Erro ao enviar a reserva:', err));
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
                {tipoPagamento === 'cartao' && (
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
                )}
                <SubmitButton text='Continuar'/>
            </form>
        </section>
    );
}

export default DadosPassageiro;
