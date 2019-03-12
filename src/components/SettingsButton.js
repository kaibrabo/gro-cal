import React, {Component} from 'react';
import './SettingsButton.css';

class SettingsButton extends Component {
    render() {
        return (
            <div className="settings-button">
                <ion-icon role="button" name="settings"></ion-icon>
            </div>
        );
    }
}

export default SettingsButton;