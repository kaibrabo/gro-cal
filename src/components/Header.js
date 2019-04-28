import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddPlant from './AddPlant';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './Header.css';
import {withRouter} from 'react-router'

class Header extends Component {
    static defaultProps = {
        onAddPlant() {

        }
    }

    static propTypes = {
        onAddPlant: PropTypes.func
    }

    render() {
        return (
            <Router>
                <div className="header-component">
                    <div className="header-container">
                        <div className="menu-btn">
                            <ion-icon name="menu"></ion-icon>
                        </div>
                        <div className="header-title">
                            <h1>Grow Calendar</h1>
                        </div>
                        <div className="add-plant-btn">
                            <button onClick={this.props.onAddPlant}>add</button>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default withRouter(Header);