- [组件](#组件)
- [创建第一个react组件](#创建第一个react组件)
- [嵌入表达式](#嵌入表达式)
- [给元素设置属性](#给元素设置属性)
  + [className属性](#className属性)
  + [设置style行内样式](#设置style行内样式)
  + [动态渲染CSS类](#动态渲染CSS类)
- [渲染列表](#渲染列表)
  + [有条件渲染](#有条件渲染)
- [事件处理](#事件处理)
  + [绑定事件句柄](#绑定事件句柄)
- [更新状态(state)](#更新状态(state))
  + [状态改变时发生了什么？](#状态改变时发生了什么？)
- [传递事件参数](#传递事件参数)
- [总结](#总结)

# [组件](#组件)

本章节讲解如何开发一个react组件，在开始前，推荐两个VS Code 插件：
- `Prettier - Code formatter`：格式化代码
- `Simple React Snippets`：react代码段快捷键

使用create-react-app脚手架创建一个新的项目，然后安装`bootstrap`：

```javascript
npm i bootstrap
```

然后再index.js文件中引入bootstrap.css文件，引入方式是：

```javascript
// index.js文件
import 'bootstrap/dist/css/bootstrap.css'
```

## [创建第一个react组件](#创建第一个react组件)

在src目录下，新建一个`components`文件夹，为方便管理，以后组件都放在这个文件夹下，然后在这个文件夹下新建一个`counter.jsx`文件（1.建议文件名使用驼峰命名法；2.推荐使用`jsx`拓展名），然后编写组件：

```javascript
// counter.jsx文件
import React, { Component } from "react";

// Counter类 通过继承 Component 类获得了很多属性
class Counter extends Component {
  // state属性
  state = {
    msg: 'world'
  };
  render() {
    // 返回的不是字符串，而是jsx表达式
    // jsx会让编译器调用 React.creteElement方法
    // 这就是为什么没有直接用到 React 还必须引入的原因
    return <h1>Hello, React</h1>;
  }
}

export default Counter;
```

然后在index.js文件中引入组件，并渲染：

```javascript
import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css'
import Counter from './components/counter'

ReactDOM.render(<Counter />, document.getElementById("root"));
```

需要注意的是，当render方法返回多个元素时，创建多个元素时，要保证只有一个顶级元素。我们知道，jsx语法会调用 React.creteElement方法，这时方法要求传入的第一个参数是元素的类型（React.creteElement('h1')），例如这里的h1，当创建两个并排元素时，babel不知道如何创建并告知react到底要创建什么元素：

```javascript
render() {
  // 错误的写法
  // return <h1>Hello, React</h1><button>Click</button>
  // 正确的写法：
    return (
      <div>
        <h1>Hello, React</h1>
        <button>Click</button>
      </div>
    );
}
```

> return 换行、或返回多行代码应该用（）包裹返回值，这个是必要的，因为js的自动补充分号机制（相当于：return ;）

上面说了，多行元素时，需要一个顶级元素包裹，有时候不想增加这么个无用div标签，这个时候，React有一个子类`Fragment`，可以使用它`React.Fragment`标签来替代顶级元素：

```javascript
return (
  <React.Fragment>
    <h1>Hello, React</h1>
    <button>Click</button>
  </React.Fragment>
);
```

## [嵌入表达式](#嵌入表达式)

Now，让我们更进一步，我们在jsx使用表达式，使我们的数据变成动态的，在组件类中添加一个state属性，设置为一个对象：

```javascript
class Counter extends Components {
  state = {
    count: 0
  };
}
```

state是react组件中一个特殊的属性，实际上它包含了这个组件需要用到的数据，例如上面添加了一个count 属性，在jsx中使用state里的数据使用`{}`括起来，`{}`里可以使用任何js变量、可被计算的表达式或者函数调用，渲染state里的属性写法如下：

```javascript
render() {
  return (
    <React.Fragment>
      {/* this引用当前组件，然后是state属性下的count属性 */}
      <h1>{this.state.count}</h1>
      <button>Click</button>
    </React.Fragment>
  )
}
```

再进一步，`{}`里调用函数，并且函数可返回jsx表达式：

```javascript
render() {
  return (
    <React.Fragment>
      {/* this引用当前组件，然后是state属性下的count属性 */}
      <h1>{this.formatCount()}</h1>
      <button>Click</button>
    </React.Fragment>
  )
}
formatCount () {
  const { count } = this.state
  return count === 0 ? <span>Zero</span> : count
  // 更简洁的写法：
  // return count || <span>Zero</span>
}
```

jsx表达式就想js的对象一样，可以在函数中返回，可以当做参数传入，可以赋值给变量、常量，非常的强大！

## [给元素设置属性](#给元素设置属性)

在属性值中的引号中无论输入什么都是静态文本，那么react中如何动态添加属性值？还是使用`{}`的方式，例如我们给img元素添加动态的url：

```javascript
class Counter extends Component {
  state = {
    count: 0,
    imgUrl: "https://picsum.photos/200"
  };
  render() {
    return (
      <React.Fragment>
        <img src={this.state.imgUrl} alt="" />
        <h1 className="badge badge-primary m-2">{this.state.count}</h1>
        <button className="btn btn-secondary btn-sm">Click</button>
      </React.Fragment>
    );
  }
}
```

### [className属性](#className属性)

But，这里要特别提醒一下，设置class属性，在jsx中，`属性class`不是写作`class`，而是写作`className`，jsx编译成的是js代码，在js中，class是保留关键字，所以不能用，所以在jsx中元素class属性对应的名称是className。

### [设置style行内样式](#设置style行内样式)

有时候，需要针对性的设置某个元素的样式，在jsx中，可以使用style属性，是以对象的方式进行的，具体的写法如下：

```javascript
// 第一种方式，直接写在元素里
render() {
  return (
    <React.Fragment>
      {/* 设置style */}
      <h1 style={{fontSize: "20px"}}>{this.formatCount()}</h1>
      {/* 上面和下面两种方式都可以，下面的方式react会自动帮我们补全为上面的样式 */}
      <h1 style={{fontSize: 20}}>{this.formatCount()}</h1>
      <button className="btn btn-secondary btn-sm">Click</button>
    </React.Fragment>
  );
}

// 第二种方式：使用变量的方式（推荐的写法）
styles = {
  // react会自动加上引号和单位
  fontSize: 20
}
render() {
  return (
    <React.Fragment>
      <h1 style={ this.styles }>{this.formatCount()}</h1>
      <button className="btn btn-secondary btn-sm">Click</button>
    </React.Fragment>
  );
}
```

> 注意是两个大括号：外层 {} 表示的是jsx表达式的，里面的 {} 和key-value表示的是一个对象，另外一点是，样式名带-的，都是用驼峰命名法，如：font-size 应该写成 fontSize


### [动态渲染CSS类](#动态渲染CSS类)

有时候，需要根据数据的不同而现实不同的类名，怎么做呢？看下面的代码：

```javascript
state = {
  count: 0
}
render() {
  let classes = "badge m-2 badge-";
  classes += this.state.count === 0 ? "warning" : "primary";
  
  return (
    <React.Fragment>
      <h1 className={classes}>{this.formatCount()}</h1>
      <button className="btn btn-secondary btn-sm">Click</button>
    </React.Fragment>
  );
}
```

使用上面的方式就可以进行动态渲染css类名，但是上面的方式污染了render方法，更好的作法是将判断代码放在单独的方法中：

```javascript
    // 更好的做法：
render() {
  return (
    <React.Fragment>
      <h1 className={this.getBadgeClasses()}>{this.formatCount()}</h1>
      <button className="btn btn-secondary btn-sm">Click</button>
    </React.Fragment>
  );
}
getBadgeClasses() {
  let classes = "badge m-2 badge-";
  classes += this.state.count === 0 ? "warning" : "primary";
  return classes;
}
```

## [渲染列表](#渲染列表)

现在我们来看看如何渲染一个列表，如果你使用过Angular 或者 Vue，应该知道可以直接使用指令的方式循环生成模板，但是react中没有循环的概念，因为jsx不是模板引擎，他只是用于渲染react元素的，那么我们应该怎么做呢？js中有一个map方法，可以映射数组的每一个元素，我们把数组中的每一个元素转换为react元素，这样就可以渲染一个列表了，具体作法看代码：

```javascript
state = {
  tags: ['tag1', 'tag2', 'tag3']
}
render() {
  return (
    <React.Fragment>
      <ul>
        {this.state.tags.map(tag => <li>{ tag }</li>)}
      </ul>
    </React.Fragment>
  );
}
```

这样就可以渲染一个列表了，So Easy，但是，如果单是上面这种写法，打开浏览器控制台发现会报错，意思是说：迭代项都要有一个唯一的key，造成这样的原因是因为react需要key区分每个列表项，因为react的虚拟DOM改变时，react能马上检测到什么组件改变了，然后要重新渲染DOM以确保同步，给定key的话，在列表中没有改变的数据就不会重新渲染，只会渲染改变了的列表项，通过key就可以找到改变的那个列表项，So，完善一下代码：

```javascript
<ul>
  {this.state.tags.map(tag => <li key={tag}>{ tag }</li>)}
</ul>
```

### [有条件渲染](#有条件渲染)

还是上面的数据渲染，如果有列表有数据，就渲染列表，如果没有数据，就显示“No Data”：

```javascript
// 方式一
render() {
  return <React.Fragment>{this.renderTags()}</React.Fragment>;
}
renderTags() {
  if (!this.state.tags.length) return <p>No Data</p>;
  // 如果什么也不想返回 就return null
  return (
    <ul>
      {this.state.tags.map(tag => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

// 方式二：使用短路与
render() {
  return (
    <React.Fragment>
      {!this.state.tags.length && <p>adsf</p>}
      {this.state.tags.length && "Hey"}
    </React.Fragment>
  );
}
```

以上两种方式，具体使用哪种方式可以根据实际情况来选择。

## [事件处理](#事件处理)

所有的react元素都有基于DOM事件的属性，例如：onClick、onMouseEnter、onKeyDown...，来看看具体代码怎么写：

```javascript
state = {
  count: 0
}
render{
  return (
    <React.Fragment>
      <h1 className={this.getBadgeClasses()}>{this.state.count}</h1>
      {/* 注意这里的引用方法并没有调用，也就是没有() */}
      <button onClick={this.handleClick} className="btn btn-secondary btn-sm">Click</button>
    </React.Fragment>
  );
}
handleClick() {
  console.log(22)
  // console.log(this.state.count) // 报错
  // console.log(this) // undefined
}
```

### [绑定事件句柄](#绑定事件句柄)

上面我们看到不能在事件处理函数中访问到state的属性，并且访问`this`是undefined，为什么会这样？js的this指向取决于如何函数如何被调用，哪个对象调用函数，this就指向哪，但是，如果函数被独立调用，this指向的就是window对象，但是如果开启了严格模式(`use strict`)，独立调用的函数就不会指向window对象，而是undefined，react就是开启了严格模式，这就是为何无法再事件处理函数中访问this的原因，那么怎么解决呢？就是使用`bind方法`。

在类中有一个构造函数`constructor`，这是类初始化实例时调用的方法，在这个方法中是可以访问到this的，So，在构造函数中绑定事件处理函数的this指向是最佳时机，具体作法是：

```javascript
class Counter extends Component {
  constructor() {
    // 使用子类构造函数之前，必须先调用父类的构造函数
    super()
    // bind方法返回函数的新实例，并且把函数的this指向当前对象
    this.handleClick = this.handleClick.bind(this)
  }
  state = {
    count: 0
  }
  render{
    return (
      <React.Fragment>
        <h1 className={this.getBadgeClasses()}>{this.state.count}</h1>
        {/* 注意这里的引用方法并没有调用，也就是没有() */}
        <button onClick={this.handleClick} className="btn btn-secondary btn-sm">Click</button>
      </React.Fragment>
    );
  }
  handleClick() {
    // 现在就可以访问this了，并且永远指向当前类
    console.log(this)
  }
}
```

上面的方法每次都要写构造函数、调用父类的构造函数、绑定事件处理函数的this指向操作，显然是比较繁琐的，其实还有另一种方法，那就是使用箭头函数，这种是面向未来的技术😋，我们来看看如何实现：

```javascript
class Counter extends Component {
  state = {
    count: 0
  }
  render{
    return (
      <React.Fragment>
        <h1 className={this.getBadgeClasses()}>{this.state.count}</h1>
        {/* 注意这里的引用方法并没有调用，也就是没有() */}
        <button onClick={this.handleClick} className="btn btn-secondary btn-sm">Click</button>
      </React.Fragment>
    );
  }
  handleClick = () => {
    // 可以访问this
    console.log(this)
  }
}
```

第二种方式比起第一种方式显然是更加简洁的，So，推荐使用第二种方式！

## [更新状态(state)](#更新状态(state))

上面我们学习了如何处理事件，现在就要学如何更新状态（state）了。在react中，我们不直接修改state的属性，因为这样是不会生效的，例如事件处理函数直接修改state：

```javascript
handleClick = () => {
  this.state.count++ // 页面不生效
}
```

当我们执行该事件处理函数时，页面的数据显示没有任何变化，但是，事实上count确实增加了，但是react不知道，所以视图没有被更新。为了解决这个问题，我们需要用到继承自Component类的一个方法：`setState方法`，这个方法告诉react，state已经更新了，然后让react去同步更新视图，基于这点，浏览器的真实DOM也会更具虚拟DOM进行修改，So，在react中，我们想要更新视图，就必须告诉它什么东西改变了，写法应该是：

```javascript
handleClick = () => {
  // 获取count的值+1，count会覆盖state的count值
  this.setState({ count: this.state.count + 1 })
}
```

这里向setState方法传入一个对象，对象的属性会与state中的属性合并；如果state中有相同的属性，就会被覆盖掉。

### [状态改变时发生了什么？](#状态改变时发生了什么？)

学习完上面的知识，差不多就是一个完整的组件了，现在让我们看看背后都发生了什么：当我们调用setState方法时，这个方法告诉react，state要变化了，react会计划调用一次render方法，也许未来某时会渲染，但是我们不知道何时，这是异步调用，它将在未来发生，所以，在未来的某一点，render方法将被调用，render方法返回新的react元素，我们知道，react是虚拟DOM，react会将返回新的react元素和旧的react元素做对比，看看他们有什么不一样的地方，然后找到真实的DOM，根据对比出不一样的地方去修改真实DOM元素保持与虚拟DOM同步，So，这样的话，只是修改了有变动的地方，没有变动的地方没有还是不会修改。

## [传递事件参数](#传递事件参数)

有时候需要向时间处理函数传递参数，在react元素中，事件是引用事件处理函数的，而不是调用，所以我们不能写成：

```javascript
<button onClick={this.handleClick(id)}>
```

正确的写法应该是使用映射函数（匿名函数返回事件处理函数）：

```javascript
<button onClick={() => this.handleClick(id)}>
```

## [总结](#总结)

本章讲解了react组件的： 

- 表达式
- 元素设置属性
- 动态渲染CSS类
- 渲染列表
- 条件渲染
- 事件处理
- 更新状态
- 传递事件参数

...等知识，相比于其他框架，react的API相对较少。okey~Thank for your reading!
