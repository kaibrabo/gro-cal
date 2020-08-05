import React, { Component } from "react";
import "./Landing.css";

class Landing extends Component {
    render() {
        return (
            <div className="body">
                <section className="landing">
                    <div className="intro">
                        <span>introducing </span>
                        <span style={{ fontWeight: 800 }}>Blumelist</span>
                    </div>
                    <div className="slogan">
                        <p>grow with confidence</p>
                    </div>
                </section>

                <section
                    className="body_section how_it_works"
                    id="how_it_works"
                >
                    <p className="intro section_title">How It Works</p>

                    <p className="intro_body">
                        Blumelist is a platform to help keep track of your
                        plants throughout their grow cycles.
                    </p>

                    <div className="how_it_works_grid">
                        <div className="how_it_works_grid_item">
                            <div className="how_it_works_point">
                                <i className="fas fa-credit-card fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        Understand how your plants grows using{" "}
                                        <strong style={{ fontSize: 18 }}>
                                            List
                                        </strong>
                                    </p>
                                    <p>
                                        Each component card gives individual
                                        plant or strain data, allowing you to
                                        precisely keep track of watering and
                                        feed.
                                    </p>
                                </div>
                            </div>

                            <div className="how_it_works_point">
                                <i className="fas fa-seedling fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        Know when your plants are growing,{" "}
                                        <br></br>
                                        and when they flower.
                                    </p>
                                    <p>
                                        With a little information at hand, it
                                        makes it easy to feed your plants the
                                        right nutrients for varying growth.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="how_it_works_grid_item">
                            <div className="how_it_works_point">
                                <i className="fas fa-clipboard-list fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        <strong style={{ fontSize: 18 }}>
                                            List
                                        </strong>{" "}
                                        and manage multiple strains and types
                                    </p>
                                    <p>
                                        Blumelist keeps your garden organized by
                                        displaying the plants attibutes,
                                        flowering times and how long it will
                                        take in each stage.
                                    </p>
                                </div>
                            </div>

                            <div className="how_it_works_point">
                                <i className="fas fa-chart-bar fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        Review your progress
                                    </p>
                                    <p>
                                        You can access previous plants with the{" "}
                                        {/* ^^ add no-break space JSX */}
                                        <strong>'finished garden'</strong> tab.
                                        This allows you to see patterns and
                                        helps make future grows easier.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="how_it_works_grid_item">
                            <div className="how_it_works_point">
                                <i className="far fa-newspaper fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        Keep up to date with Blumelist{" "}
                                        <strong style={{ fontSize: 18 }}>
                                            News
                                        </strong>
                                    </p>
                                    <p>
                                        Blumelist News is a resource for anyone
                                        interested in Cannabis plants and
                                        products. Industry experts will share
                                        their experience to create the best
                                        content, while reviewing exclusive
                                        products and events.
                                    </p>
                                </div>
                            </div>

                            <div className="how_it_works_point">
                                {/* <!-- <i className="fas fa-user-friends fa-3x"></i> --> */}
                                <i className="fas fa-mobile-alt fa-3x"></i>
                                <div className="how_it_works_body">
                                    <p className="how_it_works_title">
                                        Bring your garden with you
                                    </p>
                                    <p>
                                        You can share your garden across all
                                        platforms because Blumelist is a PWA. Simply open
                                        Blumelist.com on Safari for Iphone/Ipad,
                                        click the 'Share/Export' icon, and
                                        choose "Add to Homescreen"
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
                            <p>Blumelist</p>
                            <p>San Rafael, CA 94901</p>
                        </div>
                        <div className="phone">
                            <p>Phone:</p>
                            <p>415.377.6516</p>
                        </div>
                        <div className="phone">
                            <p>Email:</p>
                            <p>blumelist@gmail.com</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Landing;
