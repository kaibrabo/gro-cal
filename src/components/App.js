import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "../firebase";
import Header from "./Header";
import AddPlant from "./AddPlant";
import GardenList from "./GardenList";
import "./App.css";

class App extends Component {
    /* eslint-disable no-unused-vars */

    constructor(props) {
        super(props);

        this.state = {
            inventory: [],
            showForm: false,
            user: null,
        };

        this.fs = firebase.firestore();
        this.auth = firebase.auth();
        this.userRef = this.fs.collection("users");
    }

    componentDidMount() {
        this.auth
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

        this.auth.onAuthStateChanged(async (user) => {
            if (user) {
                // User is signed in.
                this.setState({ user: user });
                this.getInventory(user);
            } else {
                // User is signed out.
                console.log("Auth State: User is/has signed out");
            }
        });
    }

    getInventory = async (user) => {
        let inventory = [];
        this.userRef
            .doc(user.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    // import inventory
                    inventory = doc.data().inventory;
                    this.setState({ inventory: inventory });
                } else {
                    // add inventory to state & fbdb,
                    // & create user in fbdb
                    this.userRef
                        .doc(user.uid)
                        .set({ user: user.email, inventory: inventory });
                    this.setState({ inventory: inventory });
                }
            });
    };

    signIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    };

    signOut = () => {
        const _this = this;
        this.auth
            .signOut()
            .then(function () {
                _this.setState({
                    inventory: [],
                    plants: [],
                    showForm: false,
                    user: null,
                });
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    };

    addPlant = async (plant) => {
        if (this.state.user) {
            let plantId = this.guidGenerator();
            const addInventory = {
                inventory: [...this.state.inventory, { ...plant, plantId }],
            };
            this.setState(addInventory);
            this.userRef.doc(this.state.user.uid).set(addInventory);
        } else {
            alert("addPlant error: No User");
        }
    };

    removePlant = async (plantId) => {
        const confirm = window.confirm(
            "Are you sure you'd like to delete this plant?"
        );
        if (confirm) {
            this.userRef
                .doc(this.state.user.uid)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        let inventory = doc.data().inventory;
                        let newInventory = inventory.filter(
                            (item) => item.plantId !== plantId
                        );
                        this.setState({ inventory: newInventory });
                        this.userRef
                            .doc(this.state.user.uid)
                            .set({ inventory: newInventory });
                    }
                });
        }
    };

    // TODO: Edit Plant functionality
    editPlant = (plant) => {
        // const plant = firebase.database().ref(`/plants/${plantId}`);
        console.log(plant);
    };

    guidGenerator = () => {
        let S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0)
                .toString(16)
                .substring(1);
        };
        return (
            S4() +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            S4() +
            S4()
        );
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
                                    plants={this.state.inventory}
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
