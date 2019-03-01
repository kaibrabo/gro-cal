import React, { Component } from "react";
import firebase from "../firebase";
import Header from "./Header";
import AddPlant from "./AddPlant";
import ListItem from "./ListItem";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plants: []
        };

        this.addPlant = this.addPlant.bind(this);
    }

    componentDidMount() {
        // Retrieves plants object from firebase
        const plantsRef = firebase.database().ref('plants');

        plantsRef.on('value', (snapshot) => {
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
                })
            }

            this.setState({
                plants: newState
            })
        });
    }

    addPlant(plant) {
        const plantsRef = firebase.database().ref('plants');
        console.log(plant)
        const newPlant = {
            name: plant.name,
            type: plant.type,
            startVeg: plant.startVeg,
            startFlower: plant.startFlower,
            flowerTime: plant.flowerTime
        }

        plantsRef.push(newPlant);
        this.setState({ plants: [plantsRef] });
    }

    removePlant(plantId) {
        const plant = firebase.database().ref(`/plants/${plantId}`);
        plant.remove();
    }

    render() {
        return (
            <div className="App">
                <Header />
                <AddPlant addPlant={this.addPlant} />
                <h2>My Garden</h2>
                <ul className="list">
                    {this.state.plants.map((plant, index) => (
                        <ListItem
                            key={index}
                            plantId={plant.id}
                            name={plant.name}
                            type={plant.type}
                            startVeg={plant.startVeg}
                            startFlower={plant.startFlower}
                            flowerTime={plant.flowerTime}
                            removePlant={this.removePlant}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default App;
