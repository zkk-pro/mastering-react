import React, { Component } from "react";
// import "./App.css";
import Counters from "./components/counters";
import NavBar from "./components/navbar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 3 },
      { id: 3, value: 4 },
      { id: 4, value: 0 }
    ]
  };
  // 构造器，只会调用一次，就是当类的实例创建的时候
  // 这个时候是给属性赋值的好机会，例如从props获取数据并装在state中
  constructor(props) {
    super(props); // 通过super方法调用父级构造器
    console.log(this.props);
    // this.state = props.xxx
    // 直接设置state
    // 无法使用 this.setState()，因为这个方法需要在组件被创建并插入到DOM中之后才能调用
    // 需要把props作为参数传递到构造器中，同时也要传递给父级，否则：无法使用 this.props报错：undefined
  }

  // 这个钩子在组件被加入DOM之后调用
  // 这是使用网络请求的好时机
  componentDidMount() {
    // Ajax Call 请求数据
    // this.setState() 设置数据
    console.log("mounted...");
  }

  // 更新时期
  // prevProps：代表更新前的 props
  // prevState：代表更新前的 state
  // 所以，可以在这个钩子中判断数据是否有改变
  componentDidUpdate(prevProps, prevState) {
    console.log("App - updated...");
    console.log(prevProps, prevState);
    if (prevState.counters !== this.state.counters) {
      // todo something
      console.log("state changed");
    }
  }

  handleEvClick = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    console.log(this.state.counters);
    this.setState({ counters });
  };

  handleDelete = id => {
    const counters = this.state.counters.filter(counter => counter.id !== id);
    this.setState({ counters });
  };

  // render钩子表示组件被渲染到虚拟DOM中了
  render() {
    console.log("App - rendered...");
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onEvClick={this.handleEvClick}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
