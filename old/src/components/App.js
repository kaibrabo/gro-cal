import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { 
    // db, 
    // auth, 
    collection, 
    getDocs 
} from "../firebase";
import Landing from "./Landing";
import News from "./News";
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
            showAddForm: false,
            user: null,
            news: null,
            routes: {
                home: true,
                news: false,
                list: false,
            },
            hasErrors: false
        };

        // this.userRef = collection(db, "users");
        // // this.users = [];
        // this.getUsers(db).then(res => this.users = [...res]);
        // console.log("FIREBASE - APP:", db, this.users, this.users, this.userRef);
    }

    componentDidMount() {
        this.getNews();

        // auth.getRedirectResult()
        //     .then((result) => {
        //         if (result.credential) {
        //             // This gives you a Google Access Token. You can use it to access the Google API.
        //             const token = result.credential.accessToken;
        //         }
        //         // The signed-in user info.
        //         const user = result.user;
        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //         const { code, message, email, credential } = error;
        //         const errorObj = {
        //             code,
        //             message,
        //             email,
        //             credential,
        //         };
        //         console.log(errorObj);
        //     });

        // auth.onAuthStateChanged(async (user) => {
        //     if (user) {
        //         // User is signed in.
        //         this.setState({ user });
        //         this.getInventory(user);
        //     } else {
        //         // User is signed out.
        //         console.log("Auth State: User is/has signed out");
        //     }
        // });
    }

    async getUsers(db) {
        const usersCol = collection(db, "users");
        const usersSnap = await getDocs(usersCol); 
        const usersList = usersSnap.docs.map(doc => doc.data());
        return usersList;
    }

    getNews = () => {
        fetch(
            "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@blumelist"
        )
            .then((res) => res.json())
            .then((data) => this.setState({ news: data.items }))
            .catch(() => this.setState({ hasErrors: true }));
    };

    getInventory = (user) => {
        if (user) {
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
                        this.setState({ inventory: inventory });
                        this.userRef
                            .doc(user.uid)
                            .set({ user: user.email, inventory: inventory });
                    }
                });
        } else {
            console.log("Error: GetInventory: No User found");
        }
    };

    signIn = () => {
        // const provider = auth.GoogleAuthProvider();
        // auth.signInWithRedirect(provider);
    };

    signOut = () => {
        const _this = this;
        // auth
        //     .signOut()
        //     .then(function () {
        //         _this.setState({
        //             inventory: [],
        //             showForm: false,
        //             user: null,
        //         });
        //     })
        //     .catch(function (error) {
        //         console.log("Error: ", error);
        //     });
    };

    addPlant = async (plant) => {
        if (this.state.user) {
            let plantId = this.guidGenerator();
            const inventory = [...this.state.inventory, { ...plant, plantId }];
            this.setState({ inventory: inventory });
            this.userRef.doc(this.state.user.uid).set({ inventory: inventory });
        } else {
            alert("Please Login to add a plant to List");
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
                        this.userRef
                            .doc(this.state.user.uid)
                            .set({ inventory: newInventory });
                        this.setState({ inventory: newInventory });
                    }
                });
        }
    };

    savePlant = (plant) => {
        try {
            const { inventory } = this.state;
            const updatedInventory = inventory;
            for (let a = 0; a < inventory.length; a++) {
                if (inventory[a].plantId === plant.plantId) {
                    updatedInventory[a] = plant;
                    this.setState({ inventory: updatedInventory });
                }
            }
            this.userRef
                .doc(this.state.user.uid)
                .set({ inventory: updatedInventory });
        } catch (e) {
            console.log("Error: ", e);
        }
    };

    // General ID Generator
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
        const { showAddForm, inventory, routes, news } = this.state;
        let view = <Landing />;
        if (!routes.home) {
            if (routes.news) {
                view = <News news={news} />;
            } else if (routes.list) {
                view = (
                    <div className="body">
                        {showAddForm ? (
                            <AddPlant
                                addPlant={this.addPlant}
                                onClose={() =>
                                    this.setState({ showAddForm: false })
                                }
                            />
                        ) : null}
                        <GardenList
                            onAddPlant={() =>
                                this.setState({
                                    showAddForm: true,
                                    addItem: true,
                                })
                            }
                            inventory={inventory}
                            removePlant={this.removePlant}
                            savePlant={this.savePlant}
                        />
                    </div>
                );
            }
        }

        return (
            <div className="App">
                <Header
                    homeRoute={() =>
                        this.setState({
                            routes: {
                                home: true,
                                news: false,
                                list: false,
                            },
                        })
                    }
                    newsRoute={() =>
                        this.setState({
                            routes: {
                                home: false,
                                news: true,
                                list: false,
                            },
                        })
                    }
                    listRoute={() =>
                        this.setState({
                            routes: {
                                home: false,
                                news: false,
                                list: true,
                            },
                        })
                    }
                    signIn={this.signIn}
                    signOut={this.signOut}
                    user={this.state.user}
                />
                {view}
            </div>
        );
    }
}

export default App;
