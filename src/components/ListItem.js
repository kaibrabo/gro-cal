import React, {Component} from 'react';
import RemoveButton from './RemoveButton';
import './ListItem.css';

class ListItem extends Component {

    // date param = "string"
    // return "MM/DD/YYYY"
    dateFormat(date) {
        const dateArray = date.split('-');
        return `${dateArray[1]}/${dateArray[2]}/${dateArray[0].substr(2)}`;
    }

    // calculates the new date 
    // based on # of days
    // param & return = "YYYY-MM-DD" string
    addDays(date, days) {
        days = parseInt(days);
        const dateArray = date.split('-');
        let newDate = this.convertDateToIntArray(dateArray); 

        newDate.setDate(newDate.getDate() + days);

        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1; // getMonth returns index pos. of months
        let day = newDate.getDate();
        
        month = month < 10 ? `0${month}`: month;

        newDate = `${year}-${month}-${day}`;
        return newDate;
    }

    convertDateToIntArray(dateArray) {
        let newArray = dateArray.map(x => parseInt(x, 10));
        let newDate = new Date(newArray[0], newArray[1] - 1, newArray[2]);
        return newDate;
    }

    getDifferenceOfDays(start, end) {
        // https://stackoverflow.com/a/2627493/7704510
        const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(start);
        const secondDate = new Date(end);

        let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        if (diffDays < 10) {
            diffDays = `0${diffDays}`;
        }
        return diffDays;
    }

    render() {
        let strainColor;

        // Displays strain.type label color
        switch (this.props.type) {
            case 'Indica':
                strainColor = 'rgb(199, 89, 224)';
                break;
            case 'Hybrid':
                strainColor = 'rgb(115, 214, 85)';
                break;
            case 'Sativa':
                strainColor = 'rgb(214, 85, 85)';
                break;
            default:
                strainColor = 'rgb(115, 214, 85)';
        }

        const strainStyle = {
            backgroundColor: strainColor
        };

        return (
                <li className="list-item">
                    <div className="item" style={strainStyle}>
                        <h3>
                            <span className="item-name">
                                { this.props.name + ' ' }  
                            </span>
                            ({this.props.type}) - Day 30{}
                        </h3>
                    </div>
                    <div className="item-table">
                        <table>
                            <tbody>
                                <tr className="item-row item-labels">
                                    <td className="item-data">Veg</td>
                                    <td>+</td>
                                    <td className="item-data">Flower</td>
                                    <td>=</td>
                                    <td className="item-data">End</td>
                                </tr>
                                <tr className="item-row item-dates">
                                    <td>{this.dateFormat(this.props.startVeg)}</td>
                                    <td>{this.dateFormat(this.props.startFlower)}</td>
                                    <td>{this.dateFormat(
                                            this.addDays(
                                                this.props.startFlower,
                                                this.props.flowerTime
                                            )
                                        )}</td>
                                </tr>
                                <tr className="item-row item-days">
                                    <td>{this.getDifferenceOfDays(
                                            this.props.startVeg,
                                            this.props.startFlower
                                        )} days</td>
                                    <td>{this.props.flowerTime} days</td>
                                    <td>{this.getDifferenceOfDays(
                                            this.props.startVeg, 
                                            this.dateFormat(
                                                this.addDays(
                                                    this.props.startFlower,
                                                    this.props.flowerTime
                                                )
                                            )
                                        )} days</td>
                                </tr>                        
                            </tbody>
                        </table>
                    </div>
                    <div className="time-bar">
                        <div className="total-time">
                            <div className="veg-time">Veg</div>
                            <div className="flower-time">Flower</div>
                        </div>
                        <div className="grow-time">Progress</div>
                    </div>
                    <RemoveButton removePlant={() => this.props.removePlant(this.props.plantId)} />     
                </li>
        );
    }
}

export default ListItem;