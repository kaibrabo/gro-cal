import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import './List.css';

function List() {
    const db = firebase.firestore();
    const auth = firebase.auth();

    const [user, setUser] = useState(null);
    const [plants, setPlants] = useState([]);

    const signIn = (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        auth
            .signInWithPopup(provider)
            .then((result) => {
                setUser(result.user);
            })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => { user ? setUser(user) : setUser(null) });
        return () => unsubscribe();
    }, [auth]);

    return (
        <div className="list-container">
            {user ? (
                    <button className="signout" onClick={() => auth.signOut()}>Sign Out</button>
                ) : (
                    <button className="signin" onClick={signIn}>Sign In</button>
                )}

        </div>
    )
}

export default List;