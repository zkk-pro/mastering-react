
# [调用后端服务](#调用后端服务)

这里假设你有一定开发经验，并且使用`axios请求库`，所以下面的代码很简单：

```javascript
// list.jsx
import React, { Component } from "react";
import axios from "axios";

class List extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    this.setState({ posts });
  }
  handleAdd = async () => {
    const obj = {title: 'a', content: 'b'}
    const {data: post} = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      obj
    );
    const posts = [post, ...this.state.posts]
    this.setState({posts})
  }
  render() {
    return (
      <div className="container">
        <button className="btn btn-primary" onClick={this.handleAdd}>Add</button>
      </div>
    );
  }
}

export default List;
```

每个HTTP请求都有一个叫`Method`的属性去描述这个请求的目的，通常的方式是：

- GET请求为了获得数据
- POST请求为了创建数据
- PUT请求为了更新数据
- DELETE请求为了删除数据

还有一个OPTIONS，这是浏览器自动发出的请求，产生这个请求的原因是因为开发阶段我们的项目是在本地运行，后端API接口却在别的地方，它们两个是独立的域，从安全角度考虑，当应用向另一个域发起HTTP请求，浏览器总会发出一个OPTIONS请求。

## 更新

- 保守更新：用户的一个操作发出HTTP请求，应用要等后端返回结果后，视图才更新
- 乐观更新：先更新视图，然后再发出请求，如果请求失败，回滚用户界面

## 实用库推荐

- react-toastify：好看的Toast弹框
- Sentry.io 日志记录服务网站(不是库)