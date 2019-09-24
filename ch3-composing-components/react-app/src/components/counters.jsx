import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  // state = {
  //   counters: [
  //     { id: 1, value: 1 },
  //     { id: 2, value: 3 },
  //     { id: 3, value: 4 },
  //     { id: 4, value: 0 }
  //   ]
  // };
  // handleEvClick = (counter) => {
  //   // 这里需要注意的是，不要直接去修改state的数据，而是应该先拷贝一份数据，
  //   // 然后对拷贝的数据进行操作，最后再setState
  //   const counters = [...this.state.counters] // 拷贝state
  //   const index = counters.indexOf(counter) // 查找当前点击的数据索引
  //   counters[index] = {...counter} // 拷贝点击的数据
  //   counters[index].value++ // 然后再进行++操作
  //   this.setState({counters})
  //   // 如果不拷贝，state数据就会被直接修改，而不是通过setState
  //   console.log(this.state.counters[index])
  // }
  // handleReset = () => {
  //   const counters = this.state.counters.map(c => {
  //     c.value = 0
  //     return c
  //   });
  //   console.log(this.state.counters)
  //   this.setState({ counters });
  // };
  // handleDelete = id => {
  //   const counters = this.state.counters.filter(counter => counter.id !== id);
  //   this.setState({ counters });
  // };
  componentDidMount() {
    console.log('Counters - mounted...')
  }
  
  render() {
    // 解构props
    console.log("Counters - rendered...")
    const { onReset, counters, onDelete, onEvClick } = this.props;
    return (
      <div>
        {/* {this.state.counters.map(counter => (
          <Counter key={counter.id} value={counter.value} selected>
            <h3>Title #{counter.id}</h3>
          </Counter>
        ))} */}

        <button className="btn btn-primary btn-sm m-2" onClick={onReset}>
          Reset
        </button>
        {counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={onDelete}
            onEvClick={onEvClick}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
