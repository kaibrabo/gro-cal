import React, { Component } from "react";

class EditButton extends Component {
    render() {
        return (
            <div
                className="edit-btn-container"
                style={{ marginTop: 7, padding: 0 }}
            >
                <button
                    className="edit-btn"
                    id="editPlantButton"
                    onClick={this.props.editPlant}
                    aria-pressed="false"
                    style={{ color: "white" }}
                >
                    edit
                </button>
            </div>
        );
    }
}

export default EditButton;
