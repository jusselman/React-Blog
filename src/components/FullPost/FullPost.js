import React, { Component } from 'react';
import Axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id))
                Axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                    .then(res => {
                        this.setState({ loadedPost: res.data })
                    })
        }
    }

    deleteHandler = () => {
        Axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(res => {
                console.log(res);
            })
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Select Post</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deleteHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;