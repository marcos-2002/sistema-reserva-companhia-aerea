import { useEffect, useState } from "react"
import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"
import { useNavigate } from "react-router-dom"

function Login(){

    const [cliente, setCliente] = useState(null)
    const [clientes, setClientes] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:5000/clientes', {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then((data) => data.json())
        .then((data) => setClientes(data))
        .catch((err) => console.log('Erro ao pegar clientes' + err))
    }, [])

    function handleOnChange(e){
        setCliente({...cliente, [e.target.name]: e.target.value})
        console.log(cliente)
    }

    function submit(e){
        e.preventDefault()
        clientes.map((cli) => {
            if(cli.cpf === cliente.cpf && cli.password === cliente.password) {
                navigate('/')
            }
        })
    }

    return (
        <div>
            <form onSubmit={submit}>
                <Input
                    type='text'
                    text='Insira o CPF'
                    name='cpf'
                    placeholder='ex: 12345678912'
                    onChange={handleOnChange}
                />
                <Input
                    type='password'
                    text='Insira a sua senha'
                    name='password'
                    placeholder='Insira a senha'
                    onChange={handleOnChange}
                />
                <SubmitButton text='Entrar'/>
            </form>
        </div>
    )
}

export default Login