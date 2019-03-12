import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header-component">
                <div className="header-container">
                    <div className="menu-btn">
                        <ion-icon name="menu"></ion-icon>
                    </div>
                    <div className="header-title">
                        <h1>Grow Calendar</h1>
                    </div>
                    <div className="add-plant-btn">
                        <h1>+</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;