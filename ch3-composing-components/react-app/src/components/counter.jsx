import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: this.props.value
  };
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };
  badge() {
    let classes = "badge m-2 badge-";
    return (classes += this.state.count === 0 ? "warning" : "info");
  }
  counter() {
    const count = this.state.count;
    return count === 0 ? "Zore" : count;
  }
  render() {
    console.log(this.props);
    return (
      <div>
        {/* {this.props.children} */}
        <h3>Title #{this.props.id}</h3>
        <span className={this.badge()}>{this.counter()}</span>
        <button className="btn btn-secondary btn-sm" onClick={this.handleClick}>
          Click
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Counter;
