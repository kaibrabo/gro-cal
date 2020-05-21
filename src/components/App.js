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
            showForm: false,
            user: null,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                // User is signed in.
                console.log("Auth State Change USER: ", user);
                this.setState({ user: user });
            } else {
                // User is signed out.
                console.log("User is/has signed out");
            }
        });

        firebase
            .auth()
            .getRedirectResult()
            .then((result) => {
                if (result.credential) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const token = result.credential.accessToken;
                }
                // The signed-in user info.
                const user = result.user;
            })
            .catch((error) => {
                // Handle Errors here.
                const { code, message, email, credential } = error;
                const errorObj = {
                    code,
                    message,
                    email,
                    credential,
                };
                console.log(errorObj);
            });

        //     // // Retrieves plants object from firebase
        //     // const plantsRef = firebase.database().ref("plants");
        //     // plantsRef.on("value", snapshot => {
        //     //     let plants = snapshot.val();
        //     //     let newState = [];
        //     //     for (let plant in plants) {
        //     //         let p = plants[plant];
        //     //         newState.push({
        //     //             id: plant,
        //     //             name: p.name,
        //     //             type: p.type,
        //     //             startVeg: p.startVeg,
        //     //             startFlower: p.startFlower,
        //     //             flowerTime: p.flowerTime
        //     //         });
        //     //     }
        //     //     this.setState({
        //     //         plants: newState
        //     //     });
        //     // });
    }

    signIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    };

    signOut = () => {
        console.log("fired sign out");

        const _this = this;
        firebase
            .auth()
            .signOut()
            .then(function () {
                _this.setState({ user: null });
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    };

    addPlant = (plant) => {
        const plantsRef = firebase.database().ref("plants");
        plantsRef.push(plant);
    };

    removePlant = (plantId) => {
        const plant = firebase.database().ref(`/plants/${plantId}`);
        const confirm = window.confirm(
            "Are you sure you'd like to delete this plant?"
        );
        if (confirm) {
            plant.remove();
        }
        return;
    };

    // TODO: Edit Plant functionality
    editPlant = (plant) => {
        // const plant = firebase.database().ref(`/plants/${plantId}`);
        console.log(plant);
    };

    render() {
        const { showForm } = this.state;

        return (
            <Router>
                <div className="App">
                    <Header
                        onAddPlant={() => this.setState({ showForm: true })}
                        signIn={this.signIn}
                        signOut={this.signOut}
                        user={this.state.user}
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
