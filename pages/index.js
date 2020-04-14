import React from 'react';
const Index = () => {
    return (
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
            <a href="/api/login" className="py-4 px-2 rounded bg-pink-800 font-bold shadow-xl block w-1/4 text-center mx-auto text-white hover:shadow">Comece por aqui!</a>
        </div>
    )
}

export default Index