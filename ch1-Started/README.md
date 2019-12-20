- [入门](#入门)
  + [什么是react](#什么是react)
- [准备环境](#准备环境)
- [应用结构](#应用结构)
- [Hello_React](#Hello_React)
- [自定义配置](#自定义配置)
- [小结](#小结)

## [入门](#入门)

### [什么是react](#什么是react)

react是一个快速创建可交互用户界面的JavaScript库，它是Facebook在2011年推出的，如今是最受欢迎的JavaScript用户界面库，react应用的核心是组件，组件实际上是一段用户界面代码，当你使用react创建程序时，实际创建的是一组独立、可重用的组件，然后将这些组件组合成复杂的用户界面。

每一个react程序至少有一个组件，也就是根组件，这个组件代表了整个程序，并包含很多子组件，所以每个react程序实际上就是一个组件树。从实现方面来说，react组件通常被实现为一个JavaScript类，该类有一些状态（state），还有一个渲染方法（render），状态就是我们想渲染的东西，渲染方法实际上就是告诉浏览器你的组件长什么样子，渲染方法输出的是react元素，也就是在JavaScript对应DOM元素的一些元素，那些不是真的DOM元素，而是在内存中与之对应的JavaScript简单元素，react在内存中保持着一个轻量的DOM元素树，这也称之为`虚拟DOM（virtual DOM）`。不同于浏览器中的真实DOM，虚拟DOM很容易创建，当我们改变一个组件的状态时，我们就得到了一个新的react元素，react会拿之前的组件和子组件与之比较，它会对比差异，之后更新浏览器中的DOM，以确保信息保持同步，这就意味着如果使用react创建程序，不同于传统的JavaScript库，比如jQuery，我们不直接操作浏览器的真实DOM元素，也就是不用写`document.getElementById`这类的代码区获取DOM元素，在react中，只需要简单的改变组件的状态，之后react会自动检测并修改DOM以同步状态，这就是为什么叫`react（反应）`的原因，因为当状态改变时，react真的“反应过来了”。

react和Angular都是基于组件逻辑的架构，尽管如此，Angular是一个框架或者说完整的解决方案，但react是一个库，react值关注显示部分的东西，并且用于确保视图始终同步，这就是react做的事，不多也不少，因为这样的原因，react需要学习的API很少，当使用react开发程序时，为了实现目标，还需要借助其他库，比如：路由、处理HTTP请求等等...这不一定是坏事，因为可以选择自己喜欢的库。

## [准备环境](#准备环境)

首先我们需要安装`nodeJS`，因为我们需要用到Node的内置工具-NPM（Node包管理工具），使用它安装第三方库，如果没有安装，可以去Node官网：`https://nodejs.org`去下载并安装。

安装Node后，使用npm安装需要的包：`create-react-app`，使用这个包创建新的react程序，在命令行中输入：

```javascript
npm i -g create-react-app
```

## [安装VS Code 拓展](#安装VS Code 拓展)

为了使开发更轻松，需要安装两个VS Code插件：

- `Simple React Snippets`：react快捷命令
- `prettier`：格式化代码

## [创建第一个React App](#创建第一个React App)

通过上面安装的react脚手架来创建一个新的程序，在命令行中输入：

```javascript
// 应用的名称为：react-app
create-react-app react-app
```

使用脚手架创建程序，会安装react和所有第三方库：

- Development Server：安装一个轻量级的开发服务器
- Webpack：打包代码
- Babel：转译器babel转换react的代码

还有一些其他工具，我们使用脚手架创建的react应用，不需要任何配置，所有的都配置好了，但是如果再生产环境中要自己配置应用，可以通过`npm run eject`（后面会讲到），使用脚手架创建应用后，我们进入到应用目录并启动应用：

```javascript
cd react-app
npm start
```

执行命令后，会在本机的3000端口启动应用，然后自动打开浏览器打开网页。

## [应用结构](#应用结构)

首先看看脚手架创建都为我们生成了哪些文件：

```javascript
node_modules/ // 应用的依赖模块
public/ // 可公共访问应用的文件夹
  |--favicon.ico // 图标
  |--index.html // html模板文件
  |--mainfest.json // 包含了很多应用的meta信息
src/ 源代码文件夹
  |--App.css // App组件的样式
  |--App.js // App组件的js
  |--App.test.js // App组件的测试
  |--index.css // 入口文件的样式
  |--index.js // 应用的入口
  |--logo.svg // svg 图片
  |--serviceWorker.js // 本地实现访问应用
.gitignore // git忽略文件
package-lock.json // 固定依赖版本文件
package.json // package 信息文件
README.md // README文件
```

可以看到使用脚手架生成的项目结构非常的简洁。

## [Hello_React](#Hello_React)

删除src下的所有文件，然后创建一个index.js文件，我们自己写一个Hello World应用：

```javascript
import React from 'react' // 引入react
import ReactDom from 'react-dom' // 引入react-dom

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
```

运行应用会看到，网页中显示了我们的h1标签，并且显示Hello React，这就是我们写的第一个react应用，非常的简单。

## [自定义配置](#自定义配置)

上面我们使用react脚手架创建的是一个完全可工作的程序是零配置的，有时，可能想自己设置webpack程序的特性，这时候，就需要使用`eject`命令了。在`package.json`文件中，有4个脚本命令：

![](https://raw.githubusercontent.com/zkk-pro/mastering-react/master/doc/img/package-json.png)

- `start`：开启开发环境
- `build`：打包创建生成环境
- `test`：用来测试程序的模块和功能
- `eject`：将已生成的程序配置弹出，这样就可以自行配置了

我们看到`dependencies`（依赖）只有3个依赖，`react-script`是关心`start`、`build`的库，在依赖下，看不到任何webpack或babel的引用，这就是使用react脚手架创建应用的美妙之处，所有的复杂都隐藏了，如果使用`eject`命令，就可以在依赖下看到所有隐藏的细节了，使用命令：

```javascript
npm run eject
```

> 注意：使用这个命令弹出配置是不可逆的，所以，只有在有需要的时候才执行该操作，除非你知道你自己在干什么。

执行该命令之后，package.json文件给出了所有的依赖关系，同时在根目录有一个`config`文件夹，这是应用的配置。

## [小结](#小结)

okey~ 本章对react有了一个浅显的认识，并且使用react脚手架创建了一个简易的应用，this is a good begin! 后面我们会继续深入react的学习，come on guys!