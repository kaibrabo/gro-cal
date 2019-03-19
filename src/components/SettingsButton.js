import React, {Component} from 'react';
import RemoveButton from './RemoveButton';
import './SettingsButton.css';

class SettingsButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

        this.toggleActive = this.toggleActive.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    toggleActive() {
        return this.setState({ active: !this.state.active });
    }

    hideMenu() {
        this.setState({ active: false });
    }

    render() {
        return (
            <div className="settings-button"
                 onMouseLeave={this.hideMenu}
                 >
                <ion-icon role="button" 
                          name="settings"
                          onClick={this.toggleActive}
                          ></ion-icon>
                <div className={ this.state.active ? "settings-dropdown visible" : "settings-dropdown"} >
                    <ul>
                        <li>Edit</li>
                        <li>
                            <RemoveButton removePlant={() => this.props.removePlant(this.props.plantId)} />     
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SettingsButton;