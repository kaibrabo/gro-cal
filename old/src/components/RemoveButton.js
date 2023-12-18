import React, { Component } from "react";
import "./RemoveButton.css";

class RemoveButton extends Component {
    render() {
        return (
            <div className="remove-btn-container">
                <ion-icon
                    name="close-circle-outline"
                    className="remove-btn"
                    id="removePlantButton"
                    onClick={this.props.removePlant}
                    aria-pressed="false"
                ></ion-icon>{" "}
            </div>
        );
    }
}

export default RemoveButton;
