import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Products from "./components/products";
import ProductsDetail from "./components/productsDetail";
import Post from "./components/post";
import Movies from "./components/movies";
import Home from "./components/home";
import NotFound from "./components/notFound";
import Admin from './components/admin/admin'


function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container">
        <Switch>
          {/* 
            注意要在/products路由之前，不然就算传递了路由参数，还是匹配到的是Products组件
            而不是ProductsDetail组件
          */}
          <Route path="/products/:id" component={ProductsDetail} />
          <Route
            path="/products"
            render={props => <Products sortBy="abc" {...props} />}
          />
          <Route path="/post/:year?/:day?" component={Post} />
          <Route path="/movies" component={Movies} />
          <Route path="/admin" component={Admin} />
          <Route path="/404" component={NotFound} />
          <Route path="/" component={Home} exact />
          <Redirect from="/a" to="/movies" />
          {/* <Redirect to="/404" /> */}
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
