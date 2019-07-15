# 组合组件

上篇文章，我们学习了单个组件的写法，但是在显示的编程中都是一堆组件组成的组件树，So，这章我们学习react中的组合组件，具体来说，我们会学习组件间传递数据、如何发起及处理事件、如何让多个组件保持同步、功能性组件、生命周期（钩子函数），这些都是非常重要的内容，也是现实项目中经常用到的，学习完本章，将会对组件有深刻的理解。

每个react程序基本上都是一个组件树（多个组件组合而成），将组件组合起来去构建复杂的用户UI。

1. 首先我们创建一个`Counter`组件：

```javascript
// Counter组件
import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0
  };
  handleClick = () => {
    this.setState({ count: this.state.count + 1})
  }
  badge() {
    let classes = "badge m-2 badge-"
    return classes+= this.state.count === 0 ? 'warning' : 'info'
  }
  counter() {
    const count = this.state.count
    return count === 0 ? 'Zore': count
  }
  render() {
    return (
      <div>
        <span className={this.badge()}>{this.counter()}</span>
        <button className="btn btn-secondary btn-sm" onClick={this.handleClick}>Click</button>
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

当我们点击Click按钮时，只会更改对应的`Counter`组件的数据，So，每个组件都有自己的状态，它们是独立的。

### 向组件传递数据

现在更近一步，我们在`Counters`组件里的state新建一个数组对象，然后把数组里的值映射为`Counter`组件，并把值传递给`Counter`组件，来看看代码怎么写：

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

类似于key一样的写法，我们可以把数据传递给子组件，那么子组件如何获取到数据呢？那就是使用`props`，每个组件都有一个对象`props`，这个对象会拥有父组件传递的所有属性，上面的代码中，我们传递了两个`value`和`selected`，这两个属性会成为`props`对象的属性，`selected`没有指定值时，默认情况下是`true`，所以`props`里的`selecte`的值是`true`，`key`比较特殊，它不会成为`props`的属性。So，现在我们把`Counter`组件的value改为父组件传递过来的value：

```javascript
// Counter组件
state = {
  count: this.props.value
};
```

现在来看看页面的显示：

![](https://raw.githubusercontent.com/zkk-pro/mastering-react/master/doc/img/props.png)

看到了吧，`Counter`组件的数据是父组件传递过来的数据，这就是react父组件向子组件传递数据。

### 传递子元素

上面我们了解到父组件设置的属性传递给子组件的一个名叫`props`对象，`props`有一个很特殊的属性叫`children`，当我们想在组件里传递一些标签内容时，例如传递一个h3标签：

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

然后在`Counter`组件中的render方法中打印props，可以看到：children是一个react元素，并且元素类型是h3：

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

可以看到页面中显示了h3标签和内容：

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

### prop和state的区别

props就是我们给组件的数据；而state是组件本地或私有的数据容器，其他的组件是不能访问这个最贱的state的，它完全只能在组件内被访问，有时候组件没有state，它用props处理所有的数据，我们后面会讲到，So，只有一件事是你要记住的，props与state的区别是：props是只读的（我们不能再组件内部改变组件的输入数据，也就是不能改变props属性的值，如：this.props.value=0），props纯粹是组件的输入数据，我们不应该去修改，如果想要修改输入的数据，那么应该将输入数据复制到state中，然后在事件中修改state的值；而state是组件本身的数据，可读可写。

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
    <button className="btn btn-secondary btn-sm" onClick={this.handleClick}>Click</button>
    <button className="btn btn-danger btn-sm m-2" onClick={this.handleDelete}>Delete</button>
  </div>
);
```

但是，看看这个组件的state，只有count属性，为了删除`Counter`组件，我们需要从父组件件`Counters`的数组里删除数据，这将引入一个react非常重要的原则，组件有它们各自的状态，只有组件自己才能编辑自己的状态，在上面的例子中，数组数据是父组件`Counters`组件的一部分，那么，如果要修改编辑数组数据，应该由父组件`Counters`自己完成，那么要如何从子组件`counter`的角度去编辑父组件`Counters`的state呢？为了解决这个问题，我们需要让子组件发起一个事件，暂且我们把这个事件叫做`onDelete`事件，子组件发起这个删除事件，父组件将处理这个事件，也就是在父组件里实现数据的删除操作。这种发起和处理事件，并不是react专属的模式，在很多库中非常常见。具体是实现：首先在父组件添加一个删除数据的方法，然后通过props给子组件传递这个方法引用，下面看看代码：

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