import firebase from '../firebase.js'

export async function uploadAppointment(userID, contactID, contactName, contactEmail, listing, date) {
    const db = firebase.firestore();
    const appointmentRef = db.collection('appointment');

    const appointment = {
        firstName: contactName.split(" ")[0],
        lastName: contactName.split(" ")[1],
        date: date,
        uid: contactID,
        email: contactEmail,
        listing: listing,
        index: 0,
    };
    var doc = await appointmentRef.doc(userID).get();
    if (doc.exists) {
        const appointmentData = doc.data();
        const keys = Object.keys(appointmentData);
        const nextKey = Number(keys[keys.length - 1]) + 1;
        var formattedAppointment = {};
        formattedAppointment[nextKey] = appointment;
        formattedAppointment[nextKey]["index"] = nextKey;
        await appointmentRef.doc(userID).update(formattedAppointment);
    }
    else {
        await appointmentRef.doc(userID).set({0: appointment});
    }
}