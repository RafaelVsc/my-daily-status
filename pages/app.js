import React, { useEffect } from 'react';
import auth0 from '../lib/auth0';
import router from 'next/router';
import { db } from '../lib/db'
import { calcDistance }  from '../lib/geo'

const App = (props) => {
    useEffect(() => {
        if(!props.isAuth) {
            router.push('/')
        } else if (props.forceCreate) {
            router.push('/create-status')
        }
    })
    if(!props.isAuth || props.forceCreate) {
        return null
    }
    return (
        <div>
            <h1>Status próximo a você:</h1>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className='px-4 py-2'>ID</th>
                        <th className='px-4 py-2'>Status Saúde</th>
                        <th className='px-4 py-2'>Status Emprego</th>
                        <th className='px-4 py-2'>Distância de você</th>
                        <th className='px-4 py-2'>Coordenadas</th>
                    </tr>
                </thead>
                <tbody>
                    {props.checkins.map(checkin => {
                        return(
                            <tr>
                                <td className="border px-4 py-2">{checkin.id === props.user.sub && 'Seu status'}</td>
                                <td className="border px-4 py-2">
                                    {checkin.healthStatus === "bem" && 'Está bem e sem sintomas 🙂'}
                                    {checkin.healthStatus === "resfriado" && 'Está com sintomas de resfriado 🤕'}
                                    {checkin.healthStatus === "gripe" && 'Está com sintomas de gripe 🤒'}
                                    {checkin.healthStatus === "covid19" && 'Está com sintomas de covid-19 😷'}
                                </td>
                                <td className="border px-4 py-2">
                                    {checkin.jobStatus === "empregadoRemoto" && 'Está empregado e trabalhando remotamente'}
                                    {checkin.jobStatus === "empregadoEmCirculacao" && 'Está empregado, porém, circulando com precauções'}
                                    {checkin.jobStatus === "desempregadoPrePandemia" && 'Já estava desempregado antes do isolamento(quarentena)'}
                                    {checkin.jobStatus === "desempregadoPosPandemia" && 'Está desempregado devido a quarentena'}

                                </td>
                                <td className="border px-4 py-2">{checkin.distance} km</td>
                                <td className="border px-4 py-2">
                                    Lat: {JSON.stringify(checkin.coords.lat)}<br />
                                    Long: {JSON.stringify(checkin.coords.long)}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default App;

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)
    if(session) {
        const today = new Date()
        const currentDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
        const TodayCheckin = await   db
            .collection('markers')
            .doc(currentDate)
            .collection('checks')
            .doc(session.user.sub)
            .get()
        const todaysData = TodayCheckin.data()
        let forceCreate = true
        if(todaysData) {
            //poder ver os outros checkins
            forceCreate = false
            const checkins = await db
                .collection('markers')
                .doc(currentDate)
                .collection('checks')
                .near({
                    center: todaysData.coordinates,
                    radius: 1000
                }).get()
                const checkinsList = []
                checkins.docs.forEach(doc => {
                    checkinsList.push({
                        id: doc.id,
                        healthStatus: doc.data().healthStatus,
                        jobStatus: doc.data().jobStatus,
                        coords: {
                            lat: doc.data().coordinates.latitude.toFixed(6),
                            long: doc.data().coordinates.longitude.toFixed(6),
                        },
                        distance: calcDistance(
                            // 40.483051,
                            // -7.073710,
                            todaysData.coordinates.latitude, 
                            todaysData.coordinates.longitude, 
                            doc.data().coordinates.latitude, 
                            doc.data().coordinates.longitude
                            ).toFixed(2)
                    })
                })
                return {
                    props: {
                        isAuth: true,
                        user: session.user,
                        forceCreate: false,
                        checkins: checkinsList
                    }
                }
        }
        return {
            props: {
                isAuth: true,
                user: session.user,
                forceCreate
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