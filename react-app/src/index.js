import React from 'react'
import ReactDom from 'react-dom'

// JSX 语法
// babel会通过调用React.createElement方法来转译JSX语法
// 这就是为什么要导入React的原因，就算不会在代码中直接使用
// 但是代码需要转译，就必须导入React
const ele = <h1>Hello React</h1>

console.log(ele) // 打印出来是一个react对象

// 使用reactDom的render方法渲染虚拟DOM
// 第一个参数：传入想要渲染的元素
// 第二个参数：在哪渲染这个对象
// render方法得到一个真实DOM的引用，然后把ele虚拟DOM渲染到引用中
ReactDom.render(ele, document.getElementById('root'))