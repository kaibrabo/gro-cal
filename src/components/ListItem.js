import React, {Component} from 'react';
import './ListItem.css';

class ListItem extends Component {
    render() {
        let strainColor;
        let vegWidth, flowerWidth, progressWidth;

        // Displays strain.type backgroundColor
        switch (this.props.type) {
            case 'indica':
                strainColor = 'rgb(199, 89, 224)';
                break;
            case 'hybrid':
                strainColor = 'rgb(115, 214, 85)';
                break;
            case 'sativa':
                strainColor = 'rgb(214, 85, 85)';
        }

        // TODO: Add date calculations

        const strainStyle = {
            backgroundColor: strainColor
        }
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
                                <td>1/17/19</td>
                                <td>2/14/19</td>
                                <td>4/15/19</td>
                            </tr>
                            <tr className="item-row">
                                <td>28 days</td>
                                <td>{this.props.flower} days</td>
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