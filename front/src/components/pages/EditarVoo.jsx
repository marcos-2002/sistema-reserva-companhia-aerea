import { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from '../voo/voo.module.css'
import { useNavigate, useParams } from "react-router-dom";

function EditarVoo(){
    
    const { id } = useParams()
    const navigate = useNavigate()

    const [voo, setVoo] = useState({})
    const [resp, setResp] = useState('')

    function formatDate(date, time) {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year} ${time}`;
    }

    function handleOnChange(e) {
        if(e.target.name === 'horario_saida') {
            let saida = voo.saida
            if(saida === undefined) {
                setVoo({...voo, ['saida']: ' '+e.target.value})
            }
            else if(saida !== undefined && !saida.includes(' ')) {
                setVoo({...voo, ['saida']:  saida + ' ' + e.target.value})
            }
            else if(saida !== undefined && saida.includes(' ')) {
                if(saida.includes('-')){
                    let verif = saida.split(' ')
                    setVoo({...voo, ['saida']:  verif[0] + ' ' + e.target.value})
                }
                else {
                    setVoo({...voo, ['saida']:  ' ' + e.target.value})
                }
            }
        }
        else if(e.target.name === 'saida') {
            let saida = voo.saida
            if(saida === undefined) {
                setVoo({...voo, ['saida']: e.target.value})
            }
            else if(saida !== undefined && saida.includes(' ')) {
                if(saida.includes('-')) {
                    let verif = saida.split(' ')
                    setVoo({...voo, ['saida']:  e.target.value + ' ' + verif[1]})
                } else {
                    setVoo({...voo, ['saida']:  e.target.value + saida})
                }
            }
        }
        else if(e.target.name === 'horario_chegada') {
            let chegada = voo.chegada
            if(chegada === undefined) {
                setVoo({...voo, ['chegada']: ' '+e.target.value})
            }
            else if(chegada !== undefined && !chegada.includes(' ')) {
                setVoo({...voo, ['chegada']:  chegada + ' ' + e.target.value})
            }
            else if(chegada !== undefined && chegada.includes(' ')) {
                if(chegada.includes('-')){
                    let verif = chegada.split(' ')
                    setVoo({...voo, ['chegada']:  verif[0] + ' ' + e.target.value})
                }
                else {
                    setVoo({...voo, ['chegada']:  ' ' + e.target.value})
                }
            }
        }
        else if(e.target.name === 'chegada') {
            let chegada = voo.chegada
            if(chegada === undefined) {
                setVoo({...voo, ['chegada']: e.target.value})
            }
            else if(chegada !== undefined && chegada.includes(' ')) {
                if(chegada.includes('-')) {
                    let verif = chegada.split(' ')
                    setVoo({...voo, ['chegada']:  e.target.value + ' ' + verif[1]})
                } else {
                    setVoo({...voo, ['chegada']:  e.target.value + chegada})
                }
            }
        }
        else if (e.target.name !== 'saida' && e.target.name !== 'chegada' && e.target.name !== 'horario_saida' && e.target.name !== 'horario_chegada') {
            if(e.target.name === 'vagas'){
                let vagas = e.target.value
                vagas = Number(vagas)
                setVoo({...voo, [e.target.name]: vagas})
            } else {
                setVoo({...voo, [e.target.name]: e.target.value})
            }
        }
        console.log(voo)
    }


    function submit(e) {
        e.preventDefault();
        console.log(id)
        let formattedSaida
        let formattedChegada
        // Formatando as datas e horários no formato esperado pelo backend
        if(voo.saida !== undefined) {
            formattedSaida = formatDate(voo.saida.split(' ')[0], voo.saida.split(' ')[1]);
        }
        if(voo.chegada !== undefined) {
            formattedChegada = formatDate(voo.chegada.split(' ')[0], voo.chegada.split(' ')[1]);
        }
    
        const vooFormatted = {
            ...voo,
            saida: formattedSaida,
            chegada: formattedChegada,
        };
    
        fetch(`http://localhost:8080/voos/${id}`, {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(vooFormatted)
        })
        .then((data) => {
            if(data.status === 200){
                setResp('Voo cadastrado com sucesso!');
                navigate('/voos')
            } else {
                setResp('Erro no cadastrado do voo!');
            }
        })
        .catch(err => console.log("Erro no cadastro de voos: ---  " + err));
    }

    return (
        <section className={styles.img}>
            {/* <h1>Cadastre seus voos</h1>
             */}

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
                    text="Insira a data de saida do voo"
                    placeholder="Insira a data"
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
                    name="horario_saida"
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
                    placeholder="Insira a quantidade"
                    onChange={handleOnChange}
                />
                <Input 
                    type="number"
                    name="preçoExecutiva"
                    text="Insira o preço da passagem da classe executiva"
                    placeholder="Insira a quantidade"
                    onChange={handleOnChange}
                />
                <SubmitButton
                    text='Editar voo'
                />
            </form>
        </section>
    )
}

export default EditarVoo;