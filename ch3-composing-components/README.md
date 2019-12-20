[TOC]

# 组件组合

上篇文章，我们学习了单个组件的写法，但是在现实的编程中都是一堆组件组成的组件树，So，这章我们学习 react 中的组件组合，具体来说，我们会学习

- 组件间传递数据
- 如何发起及处理事件
- 如何让多个组件保持同步
- 功能性组件
- 生命周期（钩子函数）

这些都是非常重要的内容，也是现实项目中经常用到的，学习完本章，将会对组件有深刻的理解。

每个 react 程序基本上都是一个组件树（多个组件组合而成），将组件组合起来去构建复杂的用户 UI。

1. 首先我们创建一个`Counter`组件：

```javascript
// Counter组件
import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0
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
    return (
      <div>
        <span className={this.badge()}>{this.counter()}</span>
        <button className="btn btn-secondary btn-sm" onClick={this.handleClick}>
          Click
        </button>
      </div>
    );
  }
}

export default Counter;
```

2. 再创建一个`Counters`组件，并包含`Counter`组件：

```javascript
// Counters组件
import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {};
  render() {
    return (
      <div>
        <Counter />
        <Counter />
      </div>
    );
  }
}

export default Counters;
```

我们可以看到页面中显示：

![](https://raw.githubusercontent.com/zkk-pro/mastering-react/master/doc/img/counters.png)

当我们点击 Click 按钮时，只会更改对应的`Counter`组件的数据，So，每个组件都有自己的状态，它们是独立的。

### 向组件传递数据

现在更近一步，我们在`Counters`组件里的 state 新建一个数组对象，然后把数组里的值映射为`Counter`组件，并把值传递给`Counter`组件，来看看代码怎么写：

```javascript
// Counters组件
class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 3 },
      { id: 3, value: 4 },
      { id: 4, value: 0 }
    ]
  };
  render() {
    return (
      <div>
        {this.state.counters.map(counter => (
          <Counter key={counter.id} value={counter.value} selected />
        ))}
      </div>
    );
  }
}
```

类似于 key 一样的写法，我们可以把数据传递给子组件，那么子组件如何获取到数据呢？那就是使用`props`，每个组件都有一个对象`props`，这个对象会拥有父组件传递的所有属性，上面的代码中，我们传递了两个`value`和`selected`，这两个属性会成为`props`对象的属性，`selected`没有指定值时，默认情况下是`true`，所以`props`里的`selecte`的值是`true`，`key`比较特殊，它不会成为`props`的属性。So，现在我们把`Counter`组件的 value 改为父组件传递过来的 value：

```javascript
// Counter组件
state = {
  count: this.props.value
};
```

现在来看看页面的显示：

![](https://raw.githubusercontent.com/zkk-pro/mastering-react/master/doc/img/props.png)

看到了吧，`Counter`组件的数据是父组件传递过来的数据，这就是 react 父组件向子组件传递数据。

### 传递子元素

上面我们了解到父组件设置的属性传递给子组件的一个名叫`props`对象，`props`有一个很特殊的属性叫`children`，当我们想在组件里传递一些标签内容时，例如传递一个 h3 标签：

```javascript
// Counters组件
render() {
  return (
    <div>
      {this.state.counters.map(counter => (
        <Counter key={counter.id} value={counter.value} selected>
          <h3>Title #{counter.id}</h3>
        </Counter>
      ))}
    </div>
  );
}
```

然后在`Counter`组件中的 render 方法中打印 props，可以看到：children 是一个 react 元素，并且元素类型是 h3：

![](https://raw.githubusercontent.com/zkk-pro/mastering-react/master/doc/img/children.png)

那么来如何在子组件中渲染父组件传递过来的标签：

```javascript
render() {
  console.log(this.props)
  return (
    <div>
      {this.props.children}
      <span className={this.badge()}>{this.counter()}</span>
      <button className="btn btn-secondary btn-sm" onClick={this.handleClick}>Click</button>
    </div>
  );
}
```

可以看到页面中显示了 h3 标签和内容：

![](https://raw.githubusercontent.com/zkk-pro/mastering-react/master/doc/img/render-children.png)

在实际的开发中，至于是传递属性还是传递标签，可以根据显示情况来规划，像上面的代码，我们也可以通过传递属性来达到同样的效果：

```javascript
// Counters组件
render() {
  return (
    <div>
      {this.state.counters.map(counter => (
        <Counter key={counter.id} value={counter.value} selected id={counter.id}>
        </Counter>
      ))}
    </div>
  );
}

// Counter组件
render() {
  return (
    <div>
      <h3>Title #{this.props.id}</h3>
      <span className={this.badge()}>{this.counter()}</span>
      <button className="btn btn-secondary btn-sm" onClick={this.handleClick}>Click</button>
    </div>
  );
}
```

### prop 和 state 的区别

props 就是我们给组件的数据；而 state 是组件本地或私有的数据容器，其他的组件是不能访问这个组件的 state 的，它完全只能在组件内被访问，有时候组件没有 state，它用 props 处理所有的数据，我们后面会讲到，So，只有一件事是你要记住的，props 与 state 的区别是：props 是只读的（我们不能再组件内部改变组件的输入数据，也就是不能改变 props 属性的值，如：this.props.value=0），props 纯粹是组件的输入数据，我们不应该去修改，如果想要修改输入的数据，那么应该将输入数据复制到 state 中，然后在事件中修改 state 的值；而 state 是组件本身的数据，可读可写。

### 发起和处理事件

Now，让我们更进一步，我们在列表中添加一个按钮：

```javascript
state = {
  count: this.props.value
};
return (
  <div>
    <h3>Title #{this.props.id}</h3>
    <span className={this.badge()}>{this.counter()}</span>
    <button className="btn btn-secondary btn-sm" onClick={this.handleClick}>
      Click
    </button>
    <button className="btn btn-danger btn-sm m-2" onClick={this.handleDelete}>
      Delete
    </button>
  </div>
);
```

但是，看看这个组件的 state，只有 count 属性，为了删除`Counter`组件，我们需要从父组件件`Counters`的数组里删除数据，这将引入一个 react 非常重要的原则，组件有它们各自的状态，只有组件自己才能编辑自己的状态，在上面的例子中，数组数据是父组件`Counters`组件的一部分，那么，如果要修改编辑数组数据，应该由父组件`Counters`自己完成，那么要如何从子组件`counter`的角度去编辑父组件`Counters`的 state 呢？为了解决这个问题，我们需要让子组件发起一个事件，暂且我们把这个事件叫做`onDelete`事件，子组件发起这个删除事件，父组件将处理这个事件，也就是在父组件里实现数据的删除操作。这种发起和处理事件，并不是 react 专属的模式，在很多库中非常常见。具体是实现：首先在父组件添加一个删除数据的方法，然后通过 props 给子组件传递这个方法引用，下面看看代码：

```javascript
// Counters组件：父组件
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
```

```javascript
// Counter组件：子组件
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
```

### 数据的唯一性

我们在上面代码的基础上添加一个`重置`按钮，用来重置所有数据：

```javascript
class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 3 },
      { id: 3, value: 4 },
      { id: 4, value: 0 }
    ]
  };
  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };
  handleDelete = id => {
    const counters = this.state.counters.filter(counter => counter.id !== id);
    this.setState({ counters });
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.handleReset}
        >
          Reset
        </button>
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
```

当点击`Reset按钮`时，会发现视图并没有更新，在`React Developer Tools` 工具中查看数据：

![](https://raw.githubusercontent.com/zkk-pro/mastering-react/master/doc/img/react-state.png)

发现其实数据是已经改变了的，再看看子组件的数据：

![](https://raw.githubusercontent.com/zkk-pro/mastering-react/master/doc/img/children-props-state.png)

我们看到，props 的数据也是改变了，但是组件自身的 state 并没有改变，还是原来的值。组件自身的值只在组件实例创建的时候执行一次，当我们点击 Rest 按钮时，每个组件本地的 state 并没有更新，这就是组件数据唯一性的问题，那么如何解决呢？首先需要删除在子组件本地的 state，然后建立一个唯一的数据源，具体往下看。

### 受控组件 - (删除本地 state)

删除本地的 state，只保留 props 来接收组件所需的数据，我们称这种类型的组件为`受控组件`，受控组件没有自己的 state，它所有的数据都来自`props`，之后在数据需要改变时发起事件，这种控制是完全被其父组件控制的，下面我们把子组件改为受控组件：

```javascript
// counter子组件
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
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.onEvClick(this.props.counter)}
        >
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
```

可以看到，子组件没有 state 了，数据全部来源于 props，对数据的操作也是通过发起事件，然后父组件去修改数据的，这样就保持了数据的唯一性（数据都是来自父组件），再看看父组件的代码：

```javascript
// 父组件
class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 3 },
      { id: 3, value: 4 },
      { id: 4, value: 0 }
    ]
  };
  handleEvClick = counter => {
    // 这里需要注意的是，不要直接去修改state的数据，而是应该先拷贝一份数据，
    // 然后对拷贝的数据进行操作，最后再setState
    const counters = [...this.state.counters]; // 拷贝state
    const index = counters.indexOf(counter); // 查找当前点击的数据索引
    counters[index] = { ...counter }; // 拷贝点击的数据
    counters[index].value++; // 然后再进行++操作
    this.setState({ counters });
    // 如果不拷贝，state数据就会被直接修改，而不是通过setState
    console.log(this.state.counters[index]);
  };
  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };
  handleDelete = id => {
    const counters = this.state.counters.filter(counter => counter.id !== id);
    this.setState({ counters });
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.handleReset}
        >
          Reset
        </button>
        {this.state.counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={this.handleDelete}
            onEvClick={this.handleEvClick}
          />
        ))}
      </div>
    );
  }
}
```

### 多组件同步技术

多组件同步数据问题，例如，有一个兄弟组件和一个子组件，都需要用到数据，那么如何保证数据之间的传递和同步呢，这种情况，我们可以新增一个父组件，然后把当前组件的 state 数据和操作 state 数据的方法上移到新增的父组件中，如图：

![](https://raw.githubusercontent.com/zkk-pro/mastering-react/master/doc/img/sync-data.png)

具体代码如下：

```javascript
// App 新增的父组件
class App extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 3 },
      { id: 3, value: 4 },
      { id: 4, value: 0 }
    ]
  };
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
  render() {
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
```

```javascript
// NavBar 兄弟组件
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <span>
          totalCounters:{" "}
          <span className="badge badge-pill badge-secondary">
            {this.props.totalCounters}
          </span>
        </span>
      </nav>
    );
  }
}
```

```javascript
// Counters 当前组件
class Counters extends Component {
  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.props.onReset}
        >
          Reset
        </button>
        {this.props.counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={this.props.onDelete}
            onEvClick={this.props.onEvClick}
          />
        ))}
      </div>
    );
  }
}
```

```javascript
// Counter 子组件
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
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.onEvClick(this.props.counter)}
        >
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
```

### 无状态功能性组件

当一个组件只有 render 方法时，没有 state（只从 props 获取数据），没有事件处理方法，没有中间方法去计算什么，只是单一的 render，在这种情况下，可以把该组件改为`无状态功能性组件`，如上面的 NavBar 组件：

```javascript
// 快捷键sfc
const NavBar = props => {
  return (
    <nav className="navbar navbar-light bg-light">
      <span>
        totalCounters:{" "}
        <span className="badge badge-pill badge-secondary">
          {/* {this.props.totalCounters} */}
          {props.totalCounters}
        </span>
      </span>
    </nav>
  );
};
```

> 需要注意的是：this.props 只在组件类中有效，在无状态功能性组件中，需要将 props 作为参数，react 会再运行时将 props 作为实参传入函数中

因为不使用带有 render 方法继承于 Component 的类，所以简单的定义一个函数，返回一个 react 元素，这种就叫无状态功能性组件，当然用类定义组件没有什么问题。

### 解构实参

如果组件有很多参数传递，不想使用`this.props.xxx`或者无状态组件时的`props.xxx`，那么可以使用结构实参的方式：

```javascript
// 快捷键sfc
const NavBar = ({ totalCounters }) => {
  // 解构totalCounters属性
  return (
    <nav className="navbar navbar-light bg-light">
      <span>
        totalCounters:{" "}
        <span className="badge badge-pill badge-secondary">
          {/* {this.props.totalCounters} */}
          {totalCounters}
        </span>
      </span>
    </nav>
  );
};
```

使用组件类的组件也是可以的，就只在 render 方法中，return 之前，解构 props：

```javascript
class Counters extends Component {
  render() {
    // 解构props
    const { onReset, counters, onDelete, onEvClick } = this.props;
    return (
      <div>
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
```

## 生命周期钩子函数

一个组件会经历很多状态，每个状态都有对应的钩子函数，这些钩子函数是组件里的特殊方法，react 会自动调用这些方法，所以叫这些方法为：`生命周期钩子`，它们允许我们勾住某个特定的时刻，从而做一些事情。

1. **mount 状态**：第一个状态，这是组件被实例化并创建到 DOM 中，在 mounting 状态中有 3 个生命周期钩子：

- constructor
- render
- componentDidMount

```javascript
class App extends Component {
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

  // render钩子表示组件被渲染到虚拟DOM中了
  render() {
    console.log("rendered...")
    return ()
  }
  // 需要了解的是，一旦渲染完成，也就意味着它所有的子组件也都渲染完成了，先执行自己的render，然后执行子组件的render
}
```

在上面的 3 个生命周期钩子方法中，react 会按顺序调用上面的3个方法，

2. **update 状态**：第二个状态，这个是在 state 或者组件的 props 改变的时候发生，在这个状态中，有 2 个生命周期钩子：

- render
- componentDidUpdate

所以无论何时，我们改变组件的 state，或者传入一个新的 props，这两个方法都会依次被调用。

```javascript
  // 更新时期
  // prevProps：代表更新前的 props
  // prevState：代表更新前的 state
  // 所以，可以在这个钩子中判断数据是否有改变
  // 如果有改变，则可以进行例如ajax请求
  componentDidUpdate(prevProps, prevState) {
    console.log("App - updated...");
    console.log(prevProps, prevState);
    if (prevState.counters !== this.state.counters) {
      // todo something: Ajax call and get new data
      console.log("state changed");
    }
  }
```

3. **unmount 状态**：最有一个状态，这是当一个组件被从 DOM 中移出，这个状态有 1 个生命周期钩子

- componentWillUnmount

这个生命周期钩子在组价一旦删除时被触发

在 react 文档中，还有很多钩子函数，但是它们很少用到，90%的时间都是只用到上面的钩子，

> 需要注意的是，不能在无状态功能性组件中使用生命周期钩子。

### 总结

这个章节学习了很多组件组合的知识：

- 如何使用props在组件之间传递数据
- 发起和处理事件
- 了解了何为受控组件
- 上移state，使用这种方式，可以使用多种组件共享一个数据源（多组件数据同步）
- 功能性组件（无状态组件）
- 生命周期


