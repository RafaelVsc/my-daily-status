import React, { useState } from 'react';
import auth0 from '../lib/auth0';
import axios from 'axios';

const CreateStatus = () => {
    const [dados, setDados] = useState({
        statusSaude: 'bem',
        statusEmprego: 'empregadoRemoto',
        coords: {
            lat: null,
            long: null
        }
    })
    const getMyLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setDados(old => {
                    return {
                        ...old,
                        coords: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }
                    }
                })
            })

        }
    }
    const onStatusHealthChange = evt => {
         const value =  evt.target.value;
        setDados(old => {
            return {
                ...old,
                statusSaude: value,
            }
        })
    }
    const onStatusJobChange = evt => {
        const value =  evt.target.value;
        setDados(old => {
            return {
                ...old,
                statusEmprego: value,
            }
        })
    }

    const saveStatus = async() => {
        await axios.post('/api/save-status', dados);
    }
    return (
        <div className='row ml-5'>
            <h1 className='py-4 font-bold text-3xl'>Selecione a opção que melhor define sua situação hoje:</h1>
            <p className="my-4 font-bold">Status de Saúde, como se sente?</p>
            <label className="block">
                <input 
                type="radio" 
                name="statusSaude" 
                value="bem" 
                onClick={onStatusHealthChange}
                />
                Estou Bem e sem sintomas.
            </label>
            <label className="block">
                <input 
                type="radio" 
                name="statusSaude"
                value="resfriado" 
                onClick={onStatusHealthChange}
                />
                Estou resfriado.

            </label>
            <label className="block">
                <input 
                type="radio" 
                name="statusSaude" 
                value="gripe"
                onClick={onStatusHealthChange}
                />
                Estou com sintomas de gripe.
            </label>
            <label className="block">
                <input 
                type="radio" 
                name="statusSaude" 
                value="covid19"
                onClick={onStatusHealthChange}
                />
                Estou com sintomas de covid19.
            </label>
            
            <p className="my-4 font-bold">Status de trabalho.</p>
            <label className="block">
                <input 
                type="radio" 
                name="statusEmprego" 
                value="empregadoRemoto"
                onClick={onStatusJobChange}
                />
                Estou empregado e trabalhando remotamente.
            </label>
            <label className="block">
                <input 
                type="radio" 
                name="statusEmprego" 
                value="empregadoEmCirculacao"
                onClick={onStatusJobChange}
                />
                Estou empregado, em circulação.
            </label>
            <label className="block">
                <input 
                type="radio" 
                name="statusEmprego" 
                value="desempregadoPrePandemia" 
                onClick={onStatusJobChange}
                />
                Desempregado antes da pandemia.
            </label>
            <label className="block">
                <input 
            type="radio" 
                name="statusEmprego" 
                value="desempregadoPosPandemia" 
                onClick={onStatusJobChange}
                />
                Desempregado devido a pandemia.
            </label>
            
            <p className="my-4 font-bold">2º- Clique no botão "Informar minha localização".</p>
            <pre>Sua posição atual: {JSON.stringify(dados.coords)}</pre>
            <button onClick={getMyLocation} className='py-4 px-2 bg-pink-800 font-bold shadow-xl hover:shadow rounded block w-1/4 text-center text-white'>
                Informar minha localização
            </button>
            <p className="my-4 font-bold">3º- Clique no botão "Salvar meu status".</p>
            <button onClick={saveStatus} className='py-4 px-2 bg-pink-800 font-bold shadow-xl hover:shadow rounded block w-1/4 text-center text-white'>
                Salvar meu status
            </button>
            <p className="my-4 font-bold">4º- Para ver o resultado, clique no botão "Mostrar Resultado".</p>
            <a href='/app' className='py-4 px-2 bg-pink-800 font-bold shadow-xl hover:shadow rounded block w-1/4 text-center text-white'>
                Mostrar resultados
            </a>   
        </div>
    )
}

export default CreateStatus;

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)
    if(session) {
    return {
        props: {
            isAuth: true,
            user: session.user,
        }
    }
}
return {
    props: {
        isAuth: false,
        user: {}
    }
}
}