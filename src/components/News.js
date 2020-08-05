import React, { Component } from "react";
import "./News.css";

class News extends Component {
    formatDate = (str) => {
        const posted = str.split(" ");
        const dateArr = posted[0].split("-");
        const time = posted[1].substring(0, 5);
        const date = dateArr[1] + "." + dateArr[2] + "." + dateArr[0];
        return date + " " + time;
    };

    render() {
        if (this.props.news) {
            return (
                <div className="body news-body">
                    <div>
                        <a
                            href={this.props.news[0].link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <strong>First Time? How to use Blumelist</strong>
                        </a>
                    </div>
                    <ul style={{ listStyleType: "none" }}>
                        {this.props.news.reverse().map((post, i) => {
                            return (
                                <li className="article-item" key={i}>
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="thumbnail"
                                            src={post.thumbnail}
                                            alt="thumbnail"
                                        />
                                        <strong className="title">
                                            {post.title}
                                        </strong>
                                        <div className="">
                                            {post.description
                                                .replace(post.title, "")
                                                .slice(0, 50)
                                                .replace(/(<([^>]+)>)/gi, "") +
                                                "..."}
                                        </div>
                                        <div>
                                            {this.formatDate(post.pubDate)}
                                        </div>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }
        return <div>Loading News...</div>;
    }
}

export default News;
