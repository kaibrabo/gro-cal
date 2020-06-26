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
                        <div className="home-link">
                            <button onClick={this.props.homeRoute}>Home</button>
                        </div>
                        <div className="news-link">
                            <button onClick={this.props.newsRoute}>News</button>
                        </div>
                        <div className="list-link">
                            <button onClick={this.props.listRoute}>List</button>
                        </div>
                        <div className="login-link">
                            {this.props.user ? (
                                <div className="loggedIn">
                                    <div>
                                        <span>
                                            {this.props.user.displayName.split(" ")[0]}
                                        </span>
                                    </div>
                                    <button onClick={this.props.signOut}>
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button onClick={this.props.signIn}>
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
