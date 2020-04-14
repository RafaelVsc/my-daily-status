import React from 'react';

const Sobre = () => {
    return(
        <div>
            <div className='text-center mx-auto py-8 font-bold'>
                Uma forma de ajudar o controle da doença é <br/>
                saber onde ela está.
            </div>
            <div className='text-center mx-auto py-8 font-bold'>
                E se você soubesse como as pessoas <br/>
                ao seu redor estão?
            </div>
            <div className='text-center mx-auto py-8 font-bold'>
                Você compartilha como você está hoje, <br/>
                e só assim consegue visualizar as pessoas a sua volta<br/>
                de forma anônima.
            </div>
            <a href='/api/login' className='py-4 px-2 bg-pink-800 font-bold shadow-xl hover:shadow rounded block w-1/4 text-center mx-auto text-white'>
                Informar meus sintomas.
            </a>
        </div>  
    )
}

export default Sobre;