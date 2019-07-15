import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 3 },
      { id: 3, value: 4 },
      { id: 4, value: 0 }
    ]
  };
  handleDelete = id => {
    const counters = this.state.counters.filter(counter => counter.id !== id);
    this.setState({ counters });
  };
  render() {
    return (
      <div>
        {/* {this.state.counters.map(counter => (
          <Counter key={counter.id} value={counter.value} selected>
            <h3>Title #{counter.id}</h3>
          </Counter>
        ))} */}
        {this.state.counters.map(counter => (
          <Counter
            key={counter.id}
            value={counter.value}
            id={counter.id}
            onDelete={this.handleDelete}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
