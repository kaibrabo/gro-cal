import React, {Component} from 'react';
import './AddButton.css';

class AddButton extends Component {
    render() {
        return (
            <div className="button-container">
                <input type="submit" value="Add Plant" className="add-button"></input>            
            </div>
        );
    }
}

export default AddButton;