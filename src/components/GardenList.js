import React, { Component } from 'react';
import ListItem from './ListItem';
import './GardenList.css';

class GardenList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showFinishedList: false,
            myGarden: "my garden"
        }

        this.showGarden = this.showGarden.bind(this);
        this.showFinished = this.showFinished.bind(this);
    }

    showGarden() {
        this.setState({showFinishedList: false, myGarden: "my garden"});
    }
    
    showFinished() {
        this.setState({showFinishedList: true, myGarden: "finished"});
    }

    render() {
        var gardenHeader, plantsList;
        const showGardenList = this.state.showFinishedList;
        const myGarden = this.state.myGarden;
        const plants = this.props.plants;
        const today = new Date();
        const growing = plants.filter(stillGrowing);
        const finished = plants.filter(isFinished);
        
        const growingPlants = growing.map((plant, index) => {
            return (
                <ListItem
                    key={index}
                    plantId={plant.id}
                    name={plant.name}
                    type={plant.type}
                    startVeg={plant.startVeg}
                    startFlower={plant.startFlower}
                    flowerTime={plant.flowerTime}
                    removePlant={this.props.removePlant}
                />
            );
        });
    
        const finishedPlants = finished.map((plant, index) => {
            return (
                <ListItem
                    key={index}
                    plantId={plant.id}
                    name={plant.name}
                    type={plant.type}
                    startVeg={plant.startVeg}
                    startFlower={plant.startFlower}
                    flowerTime={plant.flowerTime}
                    removePlant={this.props.removePlant}
                />
            );
        });

        if (showGardenList) {
            gardenHeader = <button className="garden-list" onClick={this.showGarden}>{myGarden}</button>
            plantsList = <ul className="list"> {finishedPlants} </ul>;
        } else {
            gardenHeader = <button className="garden-list" onClick={this.showFinished}>{myGarden}</button>
            plantsList = <ul className="list"> {growingPlants} </ul>;
        }
    
        function stillGrowing(plant) {
            const endFlowerDate = new Date(plant.startFlower);
            endFlowerDate.setDate(endFlowerDate.getDate() + parseInt(plant.flowerTime) + 1);
    
            if (today < endFlowerDate) {
                return true;
            }
            return false;
        }
    
        function isFinished(plant) {
            const endFlowerDate = new Date(plant.startFlower);
            endFlowerDate.setDate(endFlowerDate.getDate() + parseInt(plant.flowerTime) + 1);
    
            if (today > endFlowerDate) {
                return true;
            }
            return false;
        }

        return (
            <div>
                <div className="all-garden-lists">
                    {gardenHeader}
                </div>
                <div>
                    {plantsList}
                </div>
            </div>
        );
    }
}

export default GardenList;
