import React, {Component} from 'react';
import './AddButton.css';

class AddButton extends Component {
    render() {
        return (
            <div className="button-container">
                <input type="submit" 
                       value="Add Plant" 
                       className="add-button" 
                       id="addPlantButton" 
                       aria-pressed="false"></input>            
            </div>
        );
    }
}

export default AddButton;