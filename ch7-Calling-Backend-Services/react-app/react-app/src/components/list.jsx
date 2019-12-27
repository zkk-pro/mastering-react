import React, { Component } from "react";
import axios from "axios";

class List extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    this.setState({ posts });
  }
  handleAdd = async () => {
    const obj = {title: 'a', content: 'b'}
    const {data: post} = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      obj
    );
    const posts = [post, ...this.state.posts]
    this.setState({posts})
  }
  render() {
    return (
      <div className="container">
        <button className="btn btn-primary" onClick={this.handleAdd}>Add</button>
      </div>
    );
  }
}

export default List;
