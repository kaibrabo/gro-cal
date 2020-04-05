import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "../firebase";
import Header from "./Header";
import AddPlant from "./AddPlant";
import GardenList from "./GardenList";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plants: [],
            showForm: false
        };

        this.addPlant = this.addPlant.bind(this);
    }

    componentDidMount() {
        // Retrieves plants object from firebase
        const plantsRef = firebase.database().ref("plants");

        plantsRef.on("value", snapshot => {
            let plants = snapshot.val();
            let newState = [];

            for (let plant in plants) {
                let p = plants[plant];
                newState.push({
                    id: plant,
                    name: p.name,
                    type: p.type,
                    startVeg: p.startVeg,
                    startFlower: p.startFlower,
                    flowerTime: p.flowerTime
                });
            }

            this.setState({
                plants: newState
            });
        });
    }

    signIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);

        firebase
            .auth()
            .getRedirectResult()
            .then(function(result) {
                if (result.credential) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const token = result.credential.accessToken;
                    // ...
                }
                // The signed-in user info.
                const user = result.user;
            })
            .catch(function(error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
                // ...
            });
    };

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function() {
                // Sign-out successful.
            })
            .catch(function(error) {
                // An error happened.
            });
    };

    addPlant(plant) {
        const plantsRef = firebase.database().ref("plants");
        plantsRef.push(plant);
    }

    removePlant(plantId) {
        const plant = firebase.database().ref(`/plants/${plantId}`);
        const confirm = window.confirm(
            "Are you sure you'd like to delete this plant?"
        );
        if (confirm) {
            plant.remove();
        }
        return;
    }

    // TODO: Edit Plant functionality
    editPlant(plant) {
        // const plant = firebase.database().ref(`/plants/${plantId}`);
        console.log(plant);
    }

    render() {
        const { showForm } = this.state;

        return (
            <Router>
                <div className="App">
                    <Header
                        onAddPlant={() => this.setState({ showForm: true })}
                        signIn={this.signIn}
                    />
                    {showForm ? (
                        <AddPlant
                            addPlant={this.addPlant}
                            onClose={() => this.setState({ showForm: false })}
                        />
                    ) : null}
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <GardenList
                                    plants={this.state.plants}
                                    removePlant={this.removePlant}
                                    editPlant={this.editPlant}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
