import { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from './voo.module.css'

function Voo(){
    
    const [voo, setVoo] = useState({})

    function handleOnChange(e){
        setVoo({...voo, [e.target.name]: e.target.value})
    }

    function submit(e){
        e.preventDefault()

        fetch("http://localhost:5000/voos", {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(voo)

        }).then(data => data.json()
        ).then(data => console.log("voo cadastrado com sucesso ---- " + data)
        ).catch(err => console.log("Erro no cadastro de voos: ---  " + err))
    }

    return (
        <section className={styles.img}>
            {/* <h1>Cadastre seus voos</h1>
             */}

            <form onSubmit={submit}>
                <Input 
                    type="text"
                    name="origem"
                    text="Insira a origem do voo"
                    placeholder="Insira a origem"
                    onChange={handleOnChange}
                />
                <Input 
                    type="text"
                    name="destino"
                    text="Insira o destino do voo"
                    placeholder="Insira o destino"
                    onChange={handleOnChange}
                />
                <Input 
                    type="date"
                    name="data_saida"
                    text="Insira a data de inicio do voo"
                    placeholder="Insira a data"
                    onChange={handleOnChange}
                />
                <Input 
                    type="date"
                    name="data_chegada"
                    text="Insira a data de chegada do voo"
                    placeholder="Insira a data"
                    onChange={handleOnChange}
                />
                <Input 
                    type="time"
                    name="horario_inicio"
                    text="Insira o horario de inicio do voo"
                    onChange={handleOnChange}
                />
                <Input 
                    type="time"
                    name="horario_chegada"
                    text="Insira o horario de chegada do voo"
                    onChange={handleOnChange}
                />
                <Input 
                    type="number"
                    name="vagas_executiva"
                    text="Insira a quantidade de vagas da classe executiva"
                    placeholder="Insira a quantidade"
                    onChange={handleOnChange}
                />
                <Input 
                    type="number"
                    name="preco_vagas_executiva"
                    text="Insira o valor da classe executiva"
                    placeholder="Insira o valor"
                    onChange={handleOnChange}
                />
                <Input 
                    type="number"
                    name="vagas_economica"
                    text="Insira a quantidade de vagas da classe economica"
                    placeholder="Insira a quantidade"
                    onChange={handleOnChange}
                />
                <Input 
                    type="number"
                    name="preco_vagas_economica"
                    text="Insira o valor da classe economica"
                    placeholder="Insira o valor"
                    onChange={handleOnChange}
                />
                <SubmitButton
                    text='Cadastrar voo'
                />
            </form>
        </section>
    )
}

export default Voo;