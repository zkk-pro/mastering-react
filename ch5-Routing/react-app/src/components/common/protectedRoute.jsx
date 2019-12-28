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
        if (!user) return <Redirect to="/404" />
        return Component ? <Component {...props} /> : render(props)
        // 如果有Component，就渲染组件，没有就使用render方法
      }}
    />
  );
};

export default ProtectedRoute;
