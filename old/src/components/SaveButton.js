import React from 'react';
import AddButton from './AddButton';
import './AddButton.css';

class SaveButton extends AddButton {
    render() {
        return (
            <div className="button-container">
                <input type="submit" 
                       value="save plant" 
                       className="add-button" 
                       id="addPlantButton" 
                       aria-pressed="false"></input>            
            </div>
        );
    }
}

export default SaveButton;