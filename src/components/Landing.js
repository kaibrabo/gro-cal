import React, { Component } from "react";
import "./Landing.css";

class Landing extends Component {
    render() {
        return (
            <div className="body">
                <section className="landing">
                    <div className="intro">
                        <span>introducing </span>
                        <span style={{ fontWeight: 700 }}>Blumelist</span>
                    </div>
                    <div className="slogan">
                        <p>Best Resource for cannabis enthusiats</p>
                    </div>
                    <div className="email_capture">
                        <p>
                            Join millions of users <br />
                            and pay with ease
                        </p>
                        <p>Start: 01.01.20</p>

                        {/* <!-- <div className="_form">
                            <form>
                                <input type="text" name="email" placeholder="user@mail.com" />
                                <button type="submit" value="">
                                <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div> --> */}
                    </div>
                </section>

                <section className="body_section how_it_works" id="how_it_works">
                    <p className="intro section_title">How It Works</p>

                    <p className="intro_body">
                        DiWallet is a peer-to-peer (P2P) digital wallet allowing
                        users to exchange money with virtually anyone
                    </p>

                    <div className="how_it_works_grid">
                        <div className="how_it_works_grid_item">
                            <div className="how_it_works_point">
                                <i className="fas fa-money-check-alt fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        Make and receive payments
                                    </p>
                                    <p>
                                        Users can make and receive payments
                                        using their debit card or bank account
                                    </p>
                                </div>
                            </div>

                            <div className="how_it_works_point">
                                <i className="fas fa-user-friends fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        Go ahead, pay your way
                                    </p>
                                    <p>
                                        Pay for dinner, split a trip, sponsor a
                                        project or just show someone you care.
                                        Send money with a few taps and done
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="how_it_works_grid_item">
                            <div className="how_it_works_point">
                                <i className="fas fa-balance-scale fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        Complex finance made accessible
                                    </p>
                                    <p>
                                        DiWallet will automatically keep track
                                        of balance, notify users of payments,
                                        and manage contracts
                                    </p>
                                </div>
                            </div>

                            <div className="how_it_works_point">
                                <i className="fas fa-hand-holding-usd fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        Payback over time
                                    </p>
                                    <p>
                                        You can add set payment options and
                                        interest when lending out money to
                                        ensure and establish rapport
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="how_it_works_grid_item">
                            <div className="how_it_works_point">
                                <i className="fas fa-university fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        Transfer money to & from your bank
                                    </p>
                                    <p>
                                        Moving your money between DiWallet and
                                        your bank is quick and secure
                                    </p>
                                </div>
                            </div>

                            <div className="how_it_works_point">
                                {/* <!-- <i className="fas fa-user-friends fa-3x"></i> --> */}
                                <i className="fas fa-network-wired fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        AI Credit & Blockchain Technology
                                    </p>
                                    <p>
                                        Understanding user habits and secure
                                        payments create more successful
                                        transactions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="body_section contact" id="contact">
                    <p className="intro section_title">Contact</p>

                    <div className="contact_info">
                        <div className="address">
                            <p>Address:</p>
                            <p>DiWallet, Inc.</p>
                            <p>P.O. Box</p>
                            <p>San Rafael, CA 94901</p>
                        </div>
                        <div className="phone">
                            <p>Phone:</p>
                            <p>415.377.6516</p>
                            <p>Email:</p>
                            <p>tbd</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Landing;
