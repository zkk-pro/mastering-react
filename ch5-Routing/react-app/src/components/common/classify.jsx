import React from "react";

const Classify = props => {
  // valueProperty, textProperty：让组件更有弹性
  const { items, valueProperty, textProperty, selectedItem, onSelect } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          className={
            item === selectedItem
              ? "list-group-item active"
              : "list-group-item"
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

export default Classify;
