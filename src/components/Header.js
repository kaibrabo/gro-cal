import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router} from 'react-router-dom';
import './Header.css';
import {withRouter} from 'react-router'

class Header extends Component {
    render() {
        return (
            <Router>
                <div className="header-component">
                    <div className="header-container">
                        <div className="header-title">
                            <h1>BL</h1>
                            <p>blumelist</p>
                        </div>
                        <div className="singIn-btn">
                            <button onClick={this.props.signIn}>sign in</button>
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