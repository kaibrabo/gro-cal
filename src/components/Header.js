import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <div className="header-component">
                <div className="header-container">
                    <div className="header-title">
                        <h1>BL</h1>
                        <p>blumelist</p>
                    </div>
                    <div className="links">
                        <div className="home">
                            <button onClick={this.props.homeRoute}>Home</button>
                        </div>
                        <div className="news">
                            <button onClick={this.props.newsRoute}>News</button>
                        </div>
                        <div className="list">
                            <button onClick={this.props.listRoute}>List</button>
                        </div>
                        <div className="signIn-btn">
                            {this.props.user ? (
                                <div>
                                    <div>
                                        <span>{this.props.user.displayName}</span>
                                    </div>
                                    <button onClick={this.props.signOut}>
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button onClick={this.props.signIn}>Login</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
