import React, {Component} from 'react';
import './ListItem.css';

class ListItem extends Component {

    // date param = "string"
    dateFormat(date) {
        const dateArray = date.split('-');

        return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    }

    addDays(date, days) {
        // let startDate = new Date(date);
        // startDate.setDate(startDate.getDate() + Number(days));
        // console.log(startDate);
    }

    render() {
        let strainColor;

        // Displays strain.type backgroundColor
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
                        <span className="item-name">
                            { this.props.name + ' ' }  
                        </span>
                        ({this.props.type}) - Day 30{}
                    </div>
                    <table className="item-table">
                        <tbody>
                            <tr className="item-row">
                                <td className="item-data">Veg</td>
                                <td className="item-data">Flower</td>
                                <td className="item-data">End</td>
                            </tr>
                            <tr className="item-row">
                                <td>{this.props.startVeg}</td>
                                <td>{this.props.startFlower}</td>
                                <td>{}</td>
                            </tr>
                            <tr className="item-row">
                                <td>28 days</td>
                                <td>{this.props.flowerTime} days</td>
                                <td>93 days</td>
                            </tr>                        
                        </tbody>
                    </table>
                    <div className="time-bar">
                        <div className="total-time">
                            <div className="veg-time">Veg</div>
                            <div className="flower-time">Flower</div>
                        </div>
                        <div className="grow-time">Progress</div>
                    </div>
                </li>
        );
    }
}

export default ListItem;