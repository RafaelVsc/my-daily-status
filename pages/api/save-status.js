import { db } from '../../lib/db';
import admin from 'firebase-admin';
import auth0 from '../../lib/auth0';

const saveStatus = async(req, res) => {
    const session = await auth0.getSession(req);
    if(session) {
        const dados = req.body;
        const today = new Date()
        const currentDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
        await db
        .collection('markers')
        .doc(currentDate)
        .collection('checks')
        .doc(session.user.sub)
        .set({
            user: session.user.sub,
            healthStatus: dados.statusSaude,
            jobStatus: dados.statusEmprego,
            coordinates: new admin.firestore.GeoPoint(dados.coords.lat, dados.coords.long)
        });
    }
    res.send({ ok: true });
}
// video aula 5 1:00:00
export default saveStatus