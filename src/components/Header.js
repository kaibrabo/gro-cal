import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./Header.css";
import { withRouter } from "react-router";

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
                        {/* <div className="add-plant-btn">
                            <button onClick={this.props.onAddPlant}>add</button>
                        </div> */}
                        <div className="signIn-btn">
                            {this.props.user ? (
                                <div>
                                    <div>
                                        <span>{this.props.user.displayName}</span>
                                    </div>
                                    <button onClick={this.props.signOut}>
                                        sign out
                                    </button>
                                </div>
                            ) : (
                                <button onClick={this.props.signIn}>
                                    sign in
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default withRouter(Header);
