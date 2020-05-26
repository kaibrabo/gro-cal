import React, { Component } from "react";
import RemoveButton from "./RemoveButton";
import EditPlant from "./EditPlant";
import EditButton from "./EditButton";
import "./ListItem.css";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditForm: false,
        };
    }
    // Today's Date
    // return
    todaysDate() {
        let today = new Date();
        return today;
    }

    // Date to "string" conversion
    dateConvertToString(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        let newDate = `${year}-${month}-${day}`;

        return newDate;
    }

    // date param = "string"
    // return "MM/DD/YYYY"
    dateFormat(date) {
        // get an error from date when submitting new plant
        const dateArray = date.split("-");
        return `${dateArray[1]}/${dateArray[2]}/${dateArray[0].substr(2)}`;
    }

    // calculates the new date
    // based on # of days
    // param & return = "YYYY-MM-DD" string
    addDays(date, days) {
        days = parseInt(days);
        const dateArray = date.split("-");
        let newDate = this.convertDateToIntArray(dateArray);

        newDate.setDate(newDate.getDate() + days);

        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1; // getMonth returns index pos. of months
        let day = newDate.getDate();

        month = month < 10 ? `0${month}` : month;

        newDate = `${year}-${month}-${day}`;
        return newDate;
    }

    // array of strings => array of ints
    // ["YYYY", "MM", "DD"] => [YYYY, MM, DD]
    convertDateToIntArray(dateArray) {
        let newArray = dateArray.map((x) => parseInt(x, 10));
        let newDate = new Date(newArray[0], newArray[1] - 1, newArray[2]);
        return newDate;
    }

    // start/end = "YYYY-MM-DD" string
    // returns "int" string
    getDifferenceOfDays(start, end) {
        // https://stackoverflow.com/a/2627493/7704510
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(start);
        const secondDate = new Date(end);

        if (firstDate > secondDate) {
            return "";
        }

        let diffDays = Math.round(
            Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
        );

        if (diffDays < 10) {
            diffDays = `0${diffDays}`;
        }

        diffDays = `${diffDays}`;
        return diffDays;
    }

    getPercent(val1, val2) {
        let percent = Math.round((val2 / val1) * 100);
        percent = percent >= 100 ? 100 : percent;
        return `${percent}%`;
    }

    getDaysInFlower() {
        const diffInDays = this.getDifferenceOfDays(
            this.props.startFlower,
            this.dateConvertToString(this.todaysDate())
        );

        if (diffInDays.length === 0) {
            return "";
        }
        return `- Day ${diffInDays}`;
    }

    render() {
        let strainColor;
        let today = new Date();

        // Displays strain.type label color
        switch (this.props.type) {
            case "Indica":
                strainColor = "rgb(168, 45, 196)";
                break;
            case "Hybrid":
                strainColor = "rgb(32, 137, 0)";
                break;
            case "Sativa":
                strainColor = "rgb(214, 57, 57)";
                break;
            default:
                strainColor = "rgb(32, 137, 0)";
        }

        const strainStyle = {
            backgroundColor: strainColor,
        };

        // Veg, Flower & Total time percentage
        const vegPercentage = this.getPercent(
            this.getDifferenceOfDays(
                this.props.startVeg,
                this.dateFormat(
                    this.addDays(this.props.startFlower, this.props.flowerTime)
                )
            ),
            this.getDifferenceOfDays(
                this.props.startVeg,
                this.props.startFlower
            )
        );

        const flowerPercentage = this.getPercent(
            this.getDifferenceOfDays(
                this.props.startVeg,
                this.dateFormat(
                    this.addDays(this.props.startFlower, this.props.flowerTime)
                )
            ),
            this.props.flowerTime
        );

        const progressPercentage = this.getPercent(
            this.getDifferenceOfDays(
                this.props.startVeg,
                this.dateFormat(
                    this.addDays(this.props.startFlower, this.props.flowerTime)
                )
            ),
            this.getDifferenceOfDays(
                this.props.startVeg,
                this.dateConvertToString(today)
            )
        );

        // apply Veg, Flower & Total time percentages to style attributes for progress bar
        const vegPercent = {
            width: vegPercentage,
        };

        const flowerPercent = {
            width: flowerPercentage,
        };

        const progressPercent = {
            width: progressPercentage,
        };

        return (
            <li className="list-item">
                <div className="item" style={strainStyle}>
                    <div>
                        <span className="item-name">
                            <span>{this.props.name + " "}</span>(
                            {this.props.type.substr(0, 1)})
                        </span>
                    </div>
                    <div className="item-buttons">
                        <EditButton
                            editPlant={() => {
                                this.setState({ showEditForm: true });
                            }}
                        />
                        <RemoveButton
                            removePlant={() => {
                                this.props.removePlant(this.props.plantId);
                            }}
                        />
                    </div>
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
                            <tr className="item-row item-days">
                                <td>
                                    {this.getDifferenceOfDays(
                                        this.props.startVeg,
                                        this.props.startFlower
                                    )}{" "}
                                    days
                                </td>
                                <td>{this.props.flowerTime} days</td>
                                <td>
                                    {this.getDifferenceOfDays(
                                        this.props.startVeg,
                                        this.dateFormat(
                                            this.addDays(
                                                this.props.startFlower,
                                                this.props.flowerTime
                                            )
                                        )
                                    )}{" "}
                                    days
                                </td>
                            </tr>
                            <tr className="item-row item-dates">
                                <td>{this.dateFormat(this.props.startVeg)}</td>
                                <td>
                                    {this.dateFormat(this.props.startFlower)}
                                </td>
                                <td>
                                    {this.dateFormat(
                                        this.addDays(
                                            this.props.startFlower,
                                            this.props.flowerTime
                                        )
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="time-bar">
                    <div className="total-time">
                        <div className="veg-time" style={vegPercent}>
                            {vegPercentage} Veg
                        </div>
                        <div className="flower-time" style={flowerPercent}>
                            {flowerPercentage} Flower
                        </div>
                    </div>
                    <div className="grow-time" style={progressPercent}>
                        {progressPercentage} {this.getDaysInFlower()}
                    </div>
                </div>
                <div>
                    {this.state.showEditForm ? (
                        <EditPlant
                            plantId={this.props.plantId}
                            name={this.props.name}
                            type={this.props.type}
                            startVeg={this.props.startVeg}
                            startFlower={this.props.startFlower}
                            flowerTime={this.props.flowerTime}
                            onClose={() =>
                                this.setState({ showEditForm: false })
                            }
                            savePlant={this.props.savePlant}
                            />
                    ) : null}
                </div>
            </li>
        );
    }
}

export default ListItem;
