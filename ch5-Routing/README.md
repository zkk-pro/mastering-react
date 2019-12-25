- [路由](#路由)
- [安装路由](#安装路由)
  + [使用路由](#使用路由)
  + [Switch组件](#Switch组件)
- [Link组件](#Link组件)
- [Route的props属性](#Route的props属性)
- [传入props属性](#传入props属性)
- [路由的参数](#路由的参数)
  + [可选路由参数](#可选路由参数)
- [查询字符串](#查询字符串)
- [重定向](#重定向)
- [编程式导航](#编程式导航)
- [嵌套路由](#嵌套路由)
- [NavLink组件](#NavLink组件)
- [总结](#总结)

# [路由](#路由)

- 路由字符串（Route Parameters）
- 查询字符串（Query String）
- 重定向（Redirect）
- 404 页面（Not Found Pages）
- 路由嵌套（Nested Routing）

VS Code 插件：Auto Import，这个拓展只在 react 中有效

## [安装路由](#安装路由)

与 Angular 不同，react 没有路由的概念，react 只是一个简单轻量化的库，它并不是完整的框架，它只关心渲染界面，为了让 react 支持路由，我们需要安装：`react-router-dom`，这是一个 react 中路由的实现

```javascript
npm i react-router-dom
```

### [使用路由](#使用路由)

1. 在 index.js 文件：

```javascript
// index.js
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

`BrowserRouter`这个组件，记录了浏览器的历史，并传入各组件树成员，组件数中的任何组件都可以使用历史对象，这就是这个组件的用途。

2. 注册路由，也就是告诉 react，给定的 URL 去往哪个地址。

```javascript
// App.js
import React from "react";
import { Route } from "react-router-dom";
import Products from "./components/products";
import Movies from "./components/movies";
import Home from "./components/home";

function App() {
  return (
    <div className="container">
      <h2>路由</h2>
      {/* <Movies></Movies> */}
      <Route path="/products" component={Products} />
      <Route path="/movies" component={Movies} />
      <Route path="/" component={Home} />
    </div>
  );
}

export default App;
```

`Router`很像我们自己创建的组件，它有属性 path、component，这些属性作为 props 传递，现在这个路由组件，看到现在的`URL(/products)`，如果它匹配到了这个特征，它就会渲染`Products`这个组件。

### [Switch组件](#Switch组件)

Route 的匹配算法是：检测当前的地址是否以给定的字符串开始，如果是，那对应的组件被渲染，也就是说，如果 url 是`/products`，`/`、`/products`、`/products/new`这些路由，都是匹配正确的，这样就会造成访问一个 url，却渲染了多个组件的问题，那么怎么解决这个问题？

1. 使用 exact 属性

在 Route 中设置这个属性后，这条规则只会在`完全匹配`的时候起效：

```javascript
<Route path="/" component={Home} exact />
```

2. 使用`Switch组件`

引入 Switch 组件，然后用 Switch 组件包裹这些 router，Switch 会匹配第一条符合的规则：

```javascript
// App.js
import React from "react";
import { Route, Switch } from "react-router-dom";
import Products from "./components/products";
import Movies from "./components/movies";
import Home from "./components/home";

function App() {
  return (
    <div className="container">
      <h2>路由</h2>
      <Switch>
        <Route path="/products" component={Products} />
        <Route path="/movies" component={Movies} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
```

## [Link组件](#Link组件)

在单一页面程序中，当用户从一个页面到另一个页面时，无需重载整个页面，只需要重载需要内容的部分，如果是使用 a 标签，当跳转一个连接时，就会重新加载整个页面，那么在 react 中，如何解决呢？答案是使用`Link`组件来替换 a 标签。`Link`组件没有`href`属性，代替的属性是`to`。

```javascript
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="movies">Movies</Link>
      </li>
    </ul>
  );
};

export default NavBar;
```

那么 Link 组件如何模拟路由的呢？实际上，Link 组件内置了一个 a 标签，a 标签有一个 onClick 事件，这个事件函数阻止了 a 标签的默认行为，取而代之的是只更新 url，一但 url 改变了，路由就会重新匹配 Route 组件的 path，并渲染新的组件。

## [Route的props属性](#Route的props属性)

`Route组件`也有`props属性`，并且默认有：history、location、match 属性，我们在使用 Route 组件时，并没有传入这些属性，这都是哪来的？这就是 Route 组件的功劳了，本质上 Route 组件是传入 component 属性里的所写的组件，如果 path 属性匹配了这里设置的路径，它就会渲染 component 属性里的组件，并传入 3 个 props 属性(history、location、match)：

- history 属性：是浏览器的 history 对象，可以去到不同的页面。
- location 属性：标识了现在页面的位置。
- match 属性：这里的信息是 url 是如何匹配规则的。

## [传入props属性](#传入props属性)

上面已知 Route 组件会给组件传递 3 个 props 属性，那么如果是我们自己有 props 属性要如何传递呢？如果是需要传递更多 props 给组件，那就不是使用 component 属性，而是使用 render 属性：

```javascript
// App.jsx
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/products" render={() => <Products sortBy="abc" />} />
          <Route path="/movies" component={Movies} />
        </Switch>
      </div>
    </React.Fragment>
  );
}
```

像上面的 products 路由这样写，在之前的版本中，可以给 props 添加 sortBy 属性，但是会覆盖掉默认的 3 个属性(history、location、match)，在现在的版本中(这里是 v16.12.0)，不会覆盖默认的 3 个属性，但是，添加的 sortBy 属性也`没有成功`。如果要添加新 props 属性，那么现在就要写成：

```javascript
<Route
  path="/products"
  render={props => <Products sortBy="abc" {...props} />}
/>
```

## [路由的参数](#路由的参数)

有时候需要给路由传递参数，现在来看看如何传递和处理路由参数：

```javascript
// App.jsx
<Route path="/products/:id" component={ProductsDetail} />

// navBar.jsx
<li>
  <Link to={`/products/${1}`}>productsDetail</Link>
</li>

// productsDetail.jsx
import React from 'react'
const ProductsDetail = (props) => {
return ( <div>ProductsDetail id is: {props.match.params.id}</div> );
}
export default ProductsDetail;
```

### [可选路由参数](#可选路由参数)

再看一个路由：

```javascript
// App.js
<Route path="/post/:year/:day" component={Post} />
```

当路由是：`/post/2019`没有月份时，显示的却是Home组件（Home的路由没有设置exact属性时，设置了的话就是就匹配不到任何组件），这是为什么？因为当定义路由的参数默认情况下都是必须的，所以，这样的话，当缺少月份，那就不符合上面的路由规则了，如何让月份变成可选的呢？那就是在后面加上`?`，这是正则表达式，`?`表示出现0次或1次，所以路由写成：

```javascript
// App.js
// 月份可选
<Route path="/post/:year/:day?" component={Post} />
// 年份月份都是可选
<Route path="/post/:year?/:day?" component={Post} />
```

## [查询字符串](#查询字符串)

可选参数应该是尽量避免的，正常情况下，与其使用可选参数，不如使用查询字符串，现在来看看如何在路由中读取查询字符串，上面我们知道，路由参数在`match.params`对象里面，而查询字符串则是在`location.search`里，但是是一个完整的查询语句（如：`"?data=123&value=456"`），并没有做特殊处理，对于这样的字符串，可以使用`query-string`插件来处理：

```javascript
// 安装插件
npm i query-string
```

使用

```javascript
// post.jsx
import React from "react";
import queryString from "query-string";

const Post = ({match, location}) => {
  const searchData = queryString.parse(location.search)
  return (
    <h2>
      <p>Post date: {match.params.year}-{match.params.day}</p>
      <p>data: {searchData.data}</p>
      <p>value: {searchData.value}</p>
    </h2>
  );
};

export default Post;
```

## [重定向](#重定向)

现在来看看访问未定义的路由会怎么样，例如`/xyz`，可以看到显示的是Home组件，这是默认行为，正确的做法是当访问未定义的路由，应该跳转到404页面，在这之前，我们相信为什么现在访问未定义的路由得到是Home组件，在App.js中使用Switch组件来包裹路由规则，Switch组件本质是匹配到了某个规则，就不往下匹配了，当访问不存在的路由，只有`/`是匹配的，所以最好在`/`添加上`exact属性`，这样就不会匹配到Home组件了，那么当访问不存在的路由，想让页面跳转到404页面怎么做呢？可以使用react-router-dom的`Redirect`组件，这个组件可以重定向到另一个页面：

```javascript
// App.jsx
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/products/:id" component={ProductsDetail} />
          <Route
            path="/products"
            render={props => <Products sortBy="abc" {...props} />}
          />
          <Route path="/post/:year?/:day?" component={Post} />
          <Route path="/movies" component={Movies} />
          <Route path="/404" component={NotFound} />
          <Route path="/" component={Home} exact />
          <Redirect to="/404" />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
```

`Redirect`组件有另一个应用，有时想将网页上的资源从这一页转到另一页，可以使用这个组件来实现：

```javascript
<Redirect from="/a" to="/b" />
```

上面的代码表示：如果访问`/a`路由，就会被转到`/b`路由去。

## [编程式导航](#编程式导航)

想要在事件里定向某个路由，这就是在编程式导航，那么怎么做呢？在props中的`history对象`中，有很多对导航有用的属性，例如：goBack、foFroward、push、release。push和release的不同是：`push会向浏览器历史添加地址，通过浏览器的后退键可以返回上一页，release是替换当前的页面，这样就没有历史记录了，release这种方式经常用于登录页`。

```javascript
this.props.history.push("/post")
this.props.history.release("/post")
```

## [嵌套路由](#嵌套路由)

很多适合需要用到嵌套路由，例如管理系统左侧的导航栏、tab栏...，那么在react-router中，嵌套路由怎么写呢？

```javascript
// admin.jsx
import React from "react";
import { Route, Link } from "react-router-dom";
import Post from '../post'
import Movies from '../movies'

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <ul>
        <li>
          <Link to="/admin/post">post</Link>
        </li>
        <li>
          <Link to="/admin/movies">movies</Link>
        </li>
      </ul>
      <Route path="/admin/post" component={Post} />
      <Route path="/admin/movies" component={Movies} />
    </div>
  );
};

export default Admin;
```

通过上面的代码可以看到，路由不仅是写在App.js中，`Route组件`时一个通用组件，在任何一个页面都可以写，重要的是，当url匹配了Route组件的path，然后就会在特定的位置得到指定的组件。

## [NavLink组件](#NavLink组件)

NavLink组件可以高亮某个对应的路由文字，所以需要使用字体高亮的Link，可以使用NavLink代替，使用方式和Link是一样的。

```javascript
<NavLink to="/admin/movies">movies</NavLink>
```

## [总结](#总结)

这章了解了路由和导航，学习了：

- 如何添加路由
- 操作路由参数
- 操作查询字符串
- 重定向链接
- 处理404页面
- 如何使用嵌套路由