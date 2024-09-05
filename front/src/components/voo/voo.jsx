import { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from './voo.module.css';

function Voo() {
    const [voo, setVoo] = useState({});
    const [resp, setResp] = useState('');

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setVoo((prevVoo) => ({
            ...prevVoo,
            [name]: value,
        }));
    };

    const formatDateTime = (date, time) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year} ${time}`;
    };

    const submit = (e) => {
        e.preventDefault();

        var token = localStorage.getItem('token');

        // Formatando as datas e horários no formato esperado pelo backend
        const formattedSaida = formatDateTime(voo.saida, voo.horario_saida);
        const formattedChegada = formatDateTime(voo.chegada, voo.horario_chegada);

        const vooFormatted = {
            ...voo,
            saida: formattedSaida,
            chegada: formattedChegada,
        };

        fetch("http://localhost:8080/voos", {
            method: "POST",
            headers: { 'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`},
            
            body: JSON.stringify(vooFormatted)
        })
        .then((data) => {
            if (data.ok) {
                setResp('Voo cadastrado com sucesso!');
            } else {
                setResp('Erro no cadastro do voo!');
            }
        })
        .catch(err => {
            console.log("Erro no cadastro de voos: ---  " + err);
            setResp('Erro no cadastro do voo!');
        });
    };

    return (
        <section className={styles.img}>
            <form onSubmit={submit}>
                <label>{resp}</label>
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
                    name="saida"
                    text="Insira a data de saída do voo"
                    placeholder="Insira a data"
                    onChange={handleOnChange}
                />
                <Input 
                    type="time"
                    name="horario_saida"
                    text="Insira o horário de saída do voo"
                    onChange={handleOnChange}
                />
                <Input 
                    type="date"
                    name="chegada"
                    text="Insira a data de chegada do voo"
                    placeholder="Insira a data"
                    onChange={handleOnChange}
                />
                <Input 
                    type="time"
                    name="horario_chegada"
                    text="Insira o horário de chegada do voo"
                    onChange={handleOnChange}
                />
                <Input 
                    type="number"
                    name="vagasNormal"
                    text="Insira a quantidade de vagas da classe econômica"
                    placeholder="Insira a quantidade"
                    onChange={handleOnChange}
                />
                <Input 
                    type="number"
                    name="vagasExecutiva"
                    text="Insira a quantidade de vagas da classe executiva"
                    placeholder="Insira a quantidade"
                    onChange={handleOnChange}
                />
                <Input 
                    type="number"
                    name="preçoNormal"
                    text="Insira o preço da passagem da classe econômica"
                    placeholder="Insira o preço"
                    onChange={handleOnChange}
                />
                <Input 
                    type="number"
                    name="preçoExecutiva"
                    text="Insira o preço da passagem da classe executiva"
                    placeholder="Insira o preço"
                    onChange={handleOnChange}
                />
                <SubmitButton text='Cadastrar voo' />
            </form>
        </section>
    );
}

export default Voo;
