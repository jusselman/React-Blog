import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import Axios from 'axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPost: null
    }

    componentDidMount() {
        Axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                const posts = res.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Josue'
                    }
                })
                this.setState({ posts: updatedPosts });
            })
            .catch(err => {
                console.log(err);
            })
    }

    selectPostHandler = (id) => {
        this.setState({ selectedPost: id });
    }

    render() {
        const posts = this.state.posts.map(post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.selectPostHandler(post.id)}
            />
        });

        return (
            <div>
                <div className="BlogHeaderContainer">
                    <h1>
                        Blogs by Josue
                    </h1>
                </div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost
                        id={this.state.selectedPost}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;