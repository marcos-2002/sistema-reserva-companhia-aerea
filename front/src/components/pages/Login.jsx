import { useState } from "react"
import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"
import { useNavigate } from "react-router-dom"
import useClienteContext from "../hook/useClienteContext"

function Login(){

    const [cliente, setCliente] = useState(null)
    // const [clientes, setClientes] = useState(null)
    const navigate = useNavigate()
    const {setClienteAtual} = useClienteContext()
    const [resposta, setResposta] = useState('')

    function handleOnChange(e){
        setCliente({...cliente, [e.target.name]: e.target.value})
    }

    function submit(e){
        e.preventDefault()
        fetch('http://localhost:8080/auth/login', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cliente)
        })
        .then((data) => {
            if(data.status == 400) {
                setResposta('Email ou senha incorretos')
            }
            if(data.status == 403) {
                setResposta('Email incorreto')
            }
            if(data.status == 200) {
                return data
            }
        })
        .then((data) => {
            if (data !== undefined) {
                return data.json()
            }
        })
        .then((data) => {
            localStorage.setItem('token', data.token)
            navigate('/home')
        })
        .catch((err) => console.log('Erro para achar cliente' + err))
    }

    return (
        <div>
            <form onSubmit={submit}>
                <label>{resposta}</label>
                <Input
                    type='email'
                    text='Insira o email'
                    name='email'
                    placeholder='ex: usuario@email.com'
                    onChange={handleOnChange}
                />
                <Input
                    type='password'
                    text='Insira a sua senha'
                    name='senha'
                    placeholder='Insira a senha'
                    onChange={handleOnChange}
                />
                <SubmitButton text='Entrar'/>
            </form>
        </div>
    )
}

export default Login