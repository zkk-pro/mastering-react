- [分页](#分页)
  + [分页组件](#分页组件)
  + [类型检测](#类型检测)
- [过滤](#过滤)
  + [过滤组件](#过滤组件)
  + [props默认值](#props默认值)
- [排序](#排序)
  + [moviesTable组件](#moviesTable组件)

# [分页-过滤-排序](#分页-过滤-排序)

这个小结，我们将之前的电影列表 Demo 细化，将会添加：分页、过滤和排序，这个章节将会包含多种技术，还有如何编写干净的代码。

> 事件原理：事件触发-> 修改 state -> state 的改变会触发当前以及所以子组件的重新渲染(render 方法)

# [分页](#分页)

## [分页组件](#分页组件)

```javascript
// pagination.jsx
const Pagination = props => {
  const { count, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount === 1) return null;
  const pages = new Array(pageCount).fill(0); // [0,0,0]
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page, index) => {
          const pageIndex = index + 1;
          return (
            <li
              className={
                pageIndex === currentPage ? "page-item active" : "page-item"
              }
              key={index}
            >
              <a
                className="page-link"
                style={{ cursor: "pointer" }}
                onClick={() => onPageChange(pageIndex)}
              >
                {pageIndex}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
```

## [类型检测](#类型检测)

在 react 中，内置了对 props 参数的类型检测，但是从 v15.5 版本之后，它被移到了单独的库中，所以，需要单独安装：

```javascript
npm i prop-types
```

在 Pagination 组件中引用：

```javascript
import PropTypes from "prop-types";
```

然后，我们需要给`组件类`添加一个`新的属性: propTypes`，在这个属性中定义类型检测的需求：

```javascript
// pagination.jsx
Pagination.propTypes = {
  count: PropTypes.number.isRequired, // 表示需要传递数字类型，必传
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
// 确保propTypes这个单词拼写正确，不然类型检测将无法工作
```

# [过滤](#过滤)

## [过滤组件](#过滤组件)

```javascript
// Classify.jsx
const Classify = props => {
  const { items, selectedItem, onSelect } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          key={item._id}
          onClick={() => onSelect(item.name)}
          style={{ cursor: "pointer" }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};
```

## [props默认值](#props默认值)

为了让组件更有弹性，`item._id` 和 `item.name` 设置为动态的：

```javascript
// Classify.jsx
const Classify = props => {
  // valueProperty, textProperty：让组件更有弹性
  const { items, valueProperty, textProperty, selectedItem, onSelect } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          key={item[valueProperty]}
          onClick={() => onSelect(item)}
          style={{ cursor: "pointer" }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

// 设置props的默认值
Classify.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};
// 确保defaultProps单词拼写正确
```

# [排序](#排序)

## [moviesTable组件](#moviesTable组件)

把表格封装成一个组件，然后在表头添加排序方法

```javascript
// moviesTale.jsx
import React, { Component } from "react";
import Liked from "./liked";

class MoviesTable extends Component {
  raiseSort = title => {
    let sortColumn = { ...this.props.sortColumn };
    sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    sortColumn.title = title;
    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, onLike, onDelete } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
            <th></th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => {
            return (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Liked liked={movie.liked} onClick={() => onLike(movie)} />
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={onDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
```
