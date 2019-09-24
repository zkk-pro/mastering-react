import React, { Component } from "react";

// 之前的代码
// class Counter extends Component {
//   state = {
//     count: this.props.value
//   };
//   handleClick = () => {
//     this.setState({ count: this.state.count + 1 });
//   };
//   badge() {
//     let classes = "badge m-2 badge-";
//     return (classes += this.state.count === 0 ? "warning" : "info");
//   }
//   counter() {
//     const count = this.state.count;
//     return count === 0 ? "Zore" : count;
//   }
//   render() {
//     console.log(this.props);
//     return (
//       <div>
//         {/* {this.props.children} */}
//         <h3>Title #{this.props.id}</h3>
//         <span className={this.badge()}>{this.counter()}</span>
//         <button className="btn btn-secondary btn-sm" onClick={this.handleClick}>
//           Click
//         </button>
//         <button
//           className="btn btn-danger btn-sm m-2"
//           onClick={() => this.props.onDelete(this.props.id)}
//         >
//           Delete
//         </button>
//       </div>
//     );
//   }
// }

// 受控组件代码
class Counter extends Component {
  badge() {
    let classes = "badge m-2 badge-";
    return (classes += this.props.counter.value === 0 ? "warning" : "info");
  }
  counter() {
    const count = this.props.counter.value;
    return count === 0 ? "Zore" : count;
  }
  render() {
    return (
      <div>
        <h3>Title #{this.props.counter.id}</h3>
        <span className={this.badge()}>{this.counter()}</span>
        <button className="btn btn-secondary btn-sm" onClick={() => this.props.onEvClick(this.props.counter)}>
          Click
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Counter;
