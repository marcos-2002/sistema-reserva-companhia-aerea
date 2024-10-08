import styles from './Cliente.module.css'
import Input from "../form/Input"
import SubmitButton from '../form/SubmitButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cliente() {
    
    const [cliente, setcliente] = useState({})
    const navigate = useNavigate()
    
    function handleOnChange(e){
        setcliente({...cliente, [e.target.name]: e.target.value})
    }
    
    console.log(cliente)
    function submit(e){
        e.preventDefault()

        fetch('http://localhost:8080/auth/register', {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(cliente)
        }).then((data)=>data.json())
        .then((data)=>{
            console.log("Dados de cliente cadastrado com sucesso \n" + data)
            navigate('/')
        })
        .catch((err)=>console.log("Erro no cadastro de cliente ---- " + err))
        console.log(JSON.stringify(cliente))
    }

    return (
        <section className={styles.cadastroCliente}>
            <form onSubmit={submit}>
                <Input
                    type="text"
                    name='cpf'
                    placeholder='Apenas os números'
                    text='Insira o seu CPF'
                    onChange = {handleOnChange}
                />
                <Input
                    type="text"
                    name='nome'
                    placeholder='Miguel da Silva'
                    text='Insira o seu nome completo'
                    onChange = {handleOnChange}
                />
                <Input
                    type='date'
                    name='dataNascimento'
                    text='Insira o sua data de nascimento'
                    onChange = {handleOnChange}
                />
                {/* <Input
                    type='text'
                    name='genero'
                    placeholder='M ou F'
                    text='Insira a sua data de nascimento'
                    onChange = {handleOnChange}
                /> */}
                <Input
                    type='email'
                    name='email'
                    placeholder='email@email.com'
                    text='Insira o seu e-mail'
                    onChange = {handleOnChange}
                />
                <Input
                    type='password'
                    name='senha'
                    text='Insira a sua senha'
                    onChange = {handleOnChange}
                />
                <SubmitButton text='Cadastrar cliente'/>
            </form>
        </section>
    )
}

export default Cliente;