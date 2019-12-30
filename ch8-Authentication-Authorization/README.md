# [认证与授权](#认证与授权)

后端设置响应头(header)：`access-control-expose-headers: x-auth-token`，这个响应头让服务器扩展了功能，让浏览器可以访问响应头部`x-auth-token`这个自定义属性，以 x 开头的属性，都表示自定义属性

## 封装路由


封装一个 `ProtectedRoute 组件`，这个组件返回一个 Route 组件，但是它是用户敏感的，如果用户没有登录就会重定向到登录页/404页面，这个组件不管在哪里用，都要输出一个标准的 React Route 组件

```javascript
// ProtectedRoute 组件.jsx
import React from "react";
import { Route, Redirect } from "react-router-dom";

const user = false // 模拟是否有用户

const ProtectedRoute = ({ /*path,*/ component: Component, render, ...rest }) => {
  // react 希望组件开头字母是大写，所以 component 重命名为 Component
  return (
    <Route 
      // path={path}
      {...rest}
      render={props => {
        // if (!user) return <Redirect to="/404" />
        if (!user) return <Redirect to={{
          pathname: '404',
          state: { from: props.location }
          // 传递给组件state属性，组件通过state属性拿到来自哪里，登入后，默认回到首页，如果有state属性，就去location对象的pathname 路径
        }} />
        return Component ? <Component {...props} /> : render(props)
        // 如果有Component，就渲染组件，没有就使用render方法
      }}
    />
  );
};

export default ProtectedRoute;
```

