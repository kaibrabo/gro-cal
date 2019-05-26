import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
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
                newState.push({
                    id: plant,
                    name: plants[plant].name,
                    type: plants[plant].type,
                    startVeg: plants[plant].startVeg,
                    startFlower: plants[plant].startFlower,
                    flowerTime: plants[plant].flowerTime
                });
            }

            this.setState({
                plants: newState
            });
        });
    }

    addPlant(plant) {
        const plantsRef = firebase.database().ref("plants");
        plantsRef.push(plant);
    }

    removePlant(plantId) {
        const plant = firebase.database().ref(`/plants/${plantId}`);
        plant.remove();
    }

    render() {
        const {showForm} = this.state;

        return (
            <Router>

                <div className="App">
                    <Header onAddPlant={() => this.setState({showForm: true})}/>
                    {showForm ? 
                        <AddPlant 
                            addPlant={this.addPlant}
                            onClose={() => this.setState({showForm: false})} 
                        /> : 
                        null }
                    <Switch>
                        <Route path="/" exact render={() => (
                            <GardenList plants={this.state.plants} removePlant={this.removePlant}/>
                        )} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
