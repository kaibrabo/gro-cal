import React, { useEffect, useState } from "react";
import Firebase from "../firebase";
// import Landing from "./Landing";
// import News from "./News";
// import Header from "./Header";
// import AddPlant from "./AddPlant";
// import GardenList from "./GardenList";
import "./App.css";

const signIn = () => {
    const provider = new Firebase.GoogleAuthProvider();
    Firebase.signInWithRedirect(Firebase.auth, provider);
}

function App() {

    console.log('firebase', Firebase);

    const [user, setUser] = useState(null);

    useEffect(() => {
        Firebase.getRedirectResult(Firebase.auth)
            .then((result) => {
                // The signed-in user info.
                console.log(result.user);
                const name = result.user.displayName;
                const email = result.user.email;
                const accessToken = result.user.accessToken;

                setUser({name, email, accessToken});
            }).catch((error) => {
                console.log(error);
            });
    });

    // Firebase.getRedirectResult(Firebase.auth)
    //     .then((result) => {
    //         // The signed-in user info.
    //         console.log(result.user);
    //         setUser(result.user);
    //     }).catch((error) => {
    //         console.log(error);
    //     });

    return (
        <div className="App">
            <p>home</p>
            {user ? (<p>user: {user.name}</p>) : (<button className="login" onClick={signIn}>Login</button>)}
        </div>

    )
}


// class App extends Component {
//     /* eslint-disable no-unused-vars */

//     constructor(props) {
//         super(props);

//         this.state = {
//             inventory: [],
//             showAddForm: false,
//             user: null,
//             news: null,
//             routes: {
//                 home: true,
//                 news: false,
//                 list: false,
//             },
//             hasErrors: false
//         };

//         // this.fs = Firebase.firestore();
//         this.auth = Firebase.auth;
//         // Firebase.collection("users") = this.fs.collection("users");
//         // this.userRef = Firebase.collection("users");
//     }

//     componentDidMount() {
//         this.getNews();
//         this.auth
//             .getRedirectResult()
//             .then((result) => {
//                 if (result.credential) {
//                     // This gives you a Google Access Token. You can use it to access the Google API.
//                     const token = result.credential.accessToken;
//                 }
//                 // The signed-in user info.
//                 const user = result.user;
//             })
//             .catch((error) => {
//                 // Handle Errors here.
//                 const { code, message, email, credential } = error;
//                 const errorObj = {
//                     code,
//                     message,
//                     email,
//                     credential,
//                 };
//                 console.log(errorObj);
//             });

//         this.auth.onAuthStateChanged(async (user) => {
//             if (user) {
//                 // User is signed in.
//                 this.setState({ user });
//                 this.getInventory(user);
//             } else {
//                 // User is signed out.
//                 console.log("Auth State: User is/has signed out");
//             }
//         });
//     }

//     getNews = () => {
//         fetch(
//             "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@blumelist"
//         )
//             .then((res) => res.json())
//             .then((data) => this.setState({ news: data.items }))
//             .catch(() => this.setState({ hasErrors: true }));
//     };

//     getInventory = (user) => {
//         if (user) {
//             let inventory = [];
//             Firebase.collection("users")
//                 .doc(user.uid)
//                 .get()
//                 .then((doc) => {
//                     if (doc.exists) {
//                         // import inventory
//                         inventory = doc.data().inventory;
//                         this.setState({ inventory: inventory });
//                     } else {
//                         // add inventory to state & fbdb,
//                         // & create user in fbdb
//                         this.setState({ inventory: inventory });
//                         Firebase.collection("users")
//                             .doc(user.uid)
//                             .set({ user: user.email, inventory: inventory });
//                     }
//                 });
//         } else {
//             console.log("Error: GetInventory: No User found");
//         }
//     };

//     signIn = () => {
//         const provider = new Firebase.auth.GoogleAuthProvider();
//         this.auth.signInWithRedirect(provider);
//     };

//     signOut = () => {
//         const _this = this;
//         this.auth
//             .signOut()
//             .then(function () {
//                 _this.setState({
//                     inventory: [],
//                     showForm: false,
//                     user: null,
//                 });
//             })
//             .catch(function (error) {
//                 console.log("Error: ", error);
//             });
//     };

//     addPlant = async (plant) => {
//         if (this.state.user) {
//             let plantId = this.guidGenerator();
//             const inventory = [...this.state.inventory, { ...plant, plantId }];
//             this.setState({ inventory: inventory });
//             Firebase.collection("users").doc(this.state.user.uid).set({ inventory: inventory });
//         } else {
//             alert("Please Login to add a plant to List");
//         }
//     };

//     removePlant = async (plantId) => {
//         const confirm = window.confirm(
//             "Are you sure you'd like to delete this plant?"
//         );
//         if (confirm) {
//             Firebase.collection("users")
//                 .doc(this.state.user.uid)
//                 .get()
//                 .then((doc) => {
//                     if (doc.exists) {
//                         let inventory = doc.data().inventory;
//                         let newInventory = inventory.filter(
//                             (item) => item.plantId !== plantId
//                         );
//                         Firebase.collection("users")
//                             .doc(this.state.user.uid)
//                             .set({ inventory: newInventory });
//                         this.setState({ inventory: newInventory });
//                     }
//                 });
//         }
//     };

//     savePlant = (plant) => {
//         try {
//             const { inventory } = this.state;
//             const updatedInventory = inventory;
//             for (let a = 0; a < inventory.length; a++) {
//                 if (inventory[a].plantId === plant.plantId) {
//                     updatedInventory[a] = plant;
//                     this.setState({ inventory: updatedInventory });
//                 }
//             }
//             Firebase.collection("users")
//                 .doc(this.state.user.uid)
//                 .set({ inventory: updatedInventory });
//         } catch (e) {
//             console.log("Error: ", e);
//         }
//     };

//     // General ID Generator
//     guidGenerator = () => {
//         let S4 = () => {
//             return (((1 + Math.random()) * 0x10000) | 0)
//                 .toString(16)
//                 .substring(1);
//         };
//         return (
//             S4() +
//             S4() +
//             "-" +
//             S4() +
//             "-" +
//             S4() +
//             "-" +
//             S4() +
//             "-" +
//             S4() +
//             S4() +
//             S4()
//         );
//     };

//     render() {
//         const { showAddForm, inventory, routes, news } = this.state;
//         let view = <Landing />;
//         if (!routes.home) {
//             if (routes.news) {
//                 view = <News news={news} />;
//             } else if (routes.list) {
//                 view = (
//                     <div className="body">
//                         {showAddForm ? (
//                             <AddPlant
//                                 addPlant={this.addPlant}
//                                 onClose={() =>
//                                     this.setState({ showAddForm: false })
//                                 }
//                             />
//                         ) : null}
//                         <GardenList
//                             onAddPlant={() =>
//                                 this.setState({
//                                     showAddForm: true,
//                                     addItem: true,
//                                 })
//                             }
//                             inventory={inventory}
//                             removePlant={this.removePlant}
//                             savePlant={this.savePlant}
//                         />
//                     </div>
//                 );
//             }
//         }

//         return (
//             <div className="App">
//                 <Header
//                     homeRoute={() =>
//                         this.setState({
//                             routes: {
//                                 home: true,
//                                 news: false,
//                                 list: false,
//                             },
//                         })
//                     }
//                     newsRoute={() =>
//                         this.setState({
//                             routes: {
//                                 home: false,
//                                 news: true,
//                                 list: false,
//                             },
//                         })
//                     }
//                     listRoute={() =>
//                         this.setState({
//                             routes: {
//                                 home: false,
//                                 news: false,
//                                 list: true,
//                             },
//                         })
//                     }
//                     signIn={this.signIn}
//                     signOut={this.signOut}
//                     user={this.state.user}
//                 />
//                 {view}
//             </div>
//         );
//     }
// }

export default App;
