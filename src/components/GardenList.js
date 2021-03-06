import React, { Component } from "react";
import ListItem from "./ListItem";
import "./GardenList.css";

class GardenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFinishedList: false,
            myGarden: "my garden",
        };
    }

    showGarden = () => {
        this.setState({ showFinishedList: false, myGarden: "my garden" });
    };

    showFinished = () => {
        this.setState({ showFinishedList: true, myGarden: "finished" });
    };

    render() {
        let gardenHeader, plantsList;
        const today = new Date(); // IMPORTANT: must appear above plants.filter()
        const showGardenList = this.state.showFinishedList;
        const myGarden = this.state.myGarden;
        const plants = this.props.inventory;

        // Creates two lists
        if (plants.length > 0) {
            const growing = plants.filter(stillGrowing);
            const finished = plants.filter(isFinished);

            // Creating each item
            const growingPlants = growing.map((plant, index) => {
                return (
                    <ListItem
                        key={index}
                        plantId={plant.plantId}
                        name={plant.name}
                        type={plant.type}
                        startVeg={plant.startVeg}
                        startFlower={plant.startFlower}
                        flowerTime={plant.flowerTime}
                        removePlant={this.props.removePlant}
                        savePlant={this.props.savePlant}
                    />
                );
            });

            const finishedPlants = finished.map((plant, index) => {
                return (
                    <ListItem
                        key={index}
                        plantId={plant.plantId}
                        name={plant.name}
                        type={plant.type}
                        startVeg={plant.startVeg}
                        startFlower={plant.startFlower}
                        flowerTime={plant.flowerTime}
                        removePlant={this.props.removePlant}
                        savePlant={this.props.savePlant}
                    />
                );
            });

            // sets display for Garden list & header title
            if (showGardenList) {
                gardenHeader = (
                    <button className="garden-list" onClick={this.showGarden}>
                        {myGarden}
                    </button>
                );
                plantsList = <ul className="list"> {finishedPlants} </ul>;
            } else {
                gardenHeader = (
                    <button className="garden-list" onClick={this.showFinished}>
                        {myGarden}
                    </button>
                );
                plantsList = <ul className="list"> {growingPlants} </ul>;
            }
        } else {
            gardenHeader = (
                <button className="garden-list" onClick={this.showGarden}>
                    {myGarden}
                </button>
            );
            plantsList = (
                <ul className="list">
                    <li>Add a new Plant!</li>
                </ul>
            );
        }

        function stillGrowing(plant) {
            const endFlowerDate = new Date(plant.startFlower);
            endFlowerDate.setDate(
                endFlowerDate.getDate() + parseInt(plant.flowerTime) + 1
            );

            if (today < endFlowerDate) {
                return true;
            }
            return false;
        }

        function isFinished(plant) {
            const endFlowerDate = new Date(plant.startFlower);
            endFlowerDate.setDate(
                endFlowerDate.getDate() + parseInt(plant.flowerTime) + 1
            );

            if (today > endFlowerDate) {
                return true;
            }
            return false;
        }

        return (
            <div className="body garden-body">
                <div className="all-garden-lists">{gardenHeader}</div>
                <div className="add-plant-btn">
                    <button onClick={this.props.onAddPlant}>add</button>
                </div>
                <div>{plantsList}</div>
            </div>
        );
    }
}

export default GardenList;
