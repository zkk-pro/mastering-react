import React, { Component } from "react";

// Counter类 通过继承 Component 类获得了很多属性
class Counter extends Component {
  // constructor() {
    // // 使用子类构造函数之前，必须先调用父类的构造函数
    // super()
    // // bind方法返回函数的新实例，并且把函数的this指向当前对象
    // this.handleClick = this.handleClick.bind(this)
  // }
  // state属性
  state = {
    count: 0,
    imgUrl: "https://picsum.photos/200",
    tags: ["tag1", "tag2", "tag3"]
  };
  render() {
    // 返回的不是字符串，而是jsx表达式
    // jsx语法会让编译器调用 React.creteElement方法
    // 这就是为什么没有直接用到 React 还必须引入的原因
    // return <h1>Hello, React</h1>;

    // 创建多个元素时，要保证只有一个根元素
    // 我们知道，jsx语法会调用 React.creteElement方法
    // 这时方法要求传入的第一个参数是元素的类型，例如这里的h1
    // React.creteElement('h1')
    // 当创建两个并排元素时，babel不知道如何创建并告知react到底要创建什么
    // 错误的写法：
    // return <h1>Hello, React</h1><button>Click</button>
    // 正确的写法：
    // return (
    //   <div>
    //     <h1>Hello, React</h1>
    //     <button>Click</button>
    //   </div>
    // );

    // 使用React.fragment替代顶级元素
    // return (
    //   <React.Fragment>
    //     <h1>Hello, React</h1>
    //     <button>Click</button>
    //   </React.Fragment>
    // );

    // 表达式
    // return (
    //   <React.Fragment>
    //     {/* this引用当前组件，然后是state属性下的count属性 */}
    //     <h1>{this.state.count}</h1>
    //     <h1>{this.formatCount()}</h1>
    //     <button>Click</button>
    //   </React.Fragment>
    // );

    // 设置属性
    // return (
    //   <React.Fragment>
    //     {/* 引号中无论输入什么都是静态文本，如何动态添加属性值？ */}
    //     <img src={this.state.imgUrl} alt="" />
    //     <h1 className="badge badge-primary m-2">{this.formatCount()}</h1>
    //     <button className="btn btn-secondary btn-sm">Click</button>
    //   </React.Fragment>
    // );

    // style属性
    // return (
    //   <React.Fragment>
    //     {/* 设置style */}
    //     <h1 style={{fontSize: 20}}>{this.formatCount()}</h1>
    //     <button className="btn btn-secondary btn-sm">Click</button>
    //   </React.Fragment>
    // );

    // 动态类名
    // let classes = "badge m-2 badge-";
    // classes += this.state.count === 0 ? "warning" : "primary";
    // return (
    //   <React.Fragment>
    //     <h1 className={classes}>{this.formatCount()}</h1>
    //     <button className="btn btn-secondary btn-sm">Click</button>
    //   </React.Fragment>
    // );
    // 更好的做法：
    // return (
    //   <React.Fragment>
    //     <h1 className={this.getBadgeClasses()}>{this.formatCount()}</h1>
    //     <button className="btn btn-secondary btn-sm">Click</button>
    //   </React.Fragment>
    // );

    // 渲染列表
    // return (
    //   <React.Fragment>
    //     <ul>
    //       {this.state.tags.map(tag => (
    //         <li key={tag}>{tag}</li>
    //       ))}
    //     </ul>
    //   </React.Fragment>
    // );
    // 有条件渲染
    // 方式一：使用辅助函数
    // return <React.Fragment>{this.renderTags()}</React.Fragment>;
    // 方式二
    // return (
    //   <React.Fragment>
    //     {!this.state.tags.length && <p></p>}
    //   </React.Fragment>
    // );

    // 处理事件
    // return (
    //   <React.Fragment>
    //     <h1 className={this.getBadgeClasses()}>{this.formatCount()}</h1>
    //     {/* 注意这里的引用方法并没有调用，也就是没有() */}
    //     <button onClick={this.handleClick} className="btn btn-secondary btn-sm">
    //       Click
    //     </button>
    //   </React.Fragment>
    // );
    // 传递参数
    return (
      <React.Fragment>
        <h1 className={this.getBadgeClasses()}>{this.formatCount()}</h1>
        {/* 注意这里的引用方法并没有调用，也就是没有() */}
        <button onClick={() => this.handleClick('abc')} className="btn btn-secondary btn-sm">
          Click
        </button>
      </React.Fragment>
    );
  }

  handleClick = field => {
    console.log(field)
  }
  // handleClick = () => {
  //   this.setState({ count: this.state.count + 1 })
  // }
  // 箭头函数的方式不用绑定this
  // handleClick = () => {
  //   // 可以访问this
  //   console.log(this)
  // }
  // handleClick() {
  //   console.log(22);
  //   // 并不能在这访问到state
  //   // console.log(this.state.count) // 报错
  //   console.log(this) // undefined
  // }
  // 有条件渲染
  renderTags() {
    if (!this.state.tags.length) return <p>No Data</p>;
    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }
  // 动态类名方法
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }
  // 动态数据
  formatCount() {
    const { count } = this.state;
    return count || <span>Zero</span>;
  }
}

export default Counter;
