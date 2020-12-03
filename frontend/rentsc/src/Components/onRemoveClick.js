import firebase from '../firebase.js';

export async function onRemoveClick(values, uid) {
    const FieldValue = firebase.firestore.FieldValue;
    const db = firebase.firestore();
    const appointmentRef = db.collection('appointment');
    const doc = await appointmentRef.doc(uid).get();
    if (doc.exists) {
        var temp = {};
        try {
            temp[values.index] = FieldValue.delete();
            const res = await appointmentRef.doc(uid).update(
                temp
            );
            console.log(res);
        } catch {
            window.location.reload(false);
        }
    }
    window.location.reload(false);
}