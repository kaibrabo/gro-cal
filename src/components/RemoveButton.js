import React, {Component} from 'react';
import './RemoveButton.css';

class RemoveButton extends Component {
    render() {
        return (
            <div className="remove-btn-container">
                <button className="remove-btn" 
                        id="removePlantButton"
                        onClick={this.props.removePlant}
                        aria-pressed="false">Remove</button>
            </div>
        )
    }
}

export default RemoveButton;