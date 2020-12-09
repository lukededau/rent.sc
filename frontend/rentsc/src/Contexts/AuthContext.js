import React, { useContext, useState, useEffect } from 'react'
import firebase from '../firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password, firstName, lastName) {
        const db = firebase.firestore()

        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (result) {
                return result.user.updateProfile({
                    displayName: firstName + " " + lastName
                })
            })
            .then(function (result) {
                return db.collection('users').add({
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    uid: firebase.auth().currentUser.uid
                })
            })
    }

    function login (email, password) {
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
            return firebase.auth().signInWithEmailAndPassword(email, password)
        })
        .catch(function (error){
            return error()
        })
    }

    function logout() {
        return firebase.auth().signOut()
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
