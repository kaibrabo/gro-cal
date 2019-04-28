import React, {Component} from 'react';
import ListItem from './ListItem';
import './GardenList.css';

class GardenList extends Component {
    render() {
        return (
            <div>
                <h2>My Garden</h2>
                <ul className="list">
                    {this.props.plants.map((plant, index) => (
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
                    ))}
                </ul>
            </div>
        );
    }
}

export default GardenList;
