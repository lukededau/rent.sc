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
            await appointmentRef.doc(uid).update(
                temp
            );
        } catch {
            window.location.reload(false);
        }
    }
    window.location.reload(false);
}