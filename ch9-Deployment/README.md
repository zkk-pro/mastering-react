
# [部署](#部署)

## 根据环境定义接口

每个应用都需要跨域多个环境，例如：开发环境、测试环境、生产环境，有时想让参数根据不同环境改变，例如开发环境，我们使用开发环境的后端API，到了生产环境，就是生产环境的API。

## 使用React内建处理特定环境的变量

在应用的根目录，新建`.env`文件表示环境，`.env.development`表示开发环境变量，都是key value形式，所有的key都是以`REACT_APP_`开头，如果不以这个开头，参数将不能工作，在环境中定义的变量，在运行时会替换为真实的值：

**开发环境**

```javascript
// .env.development
// 定义环境变量
REACT_APP_NAME = hello
REACT_APP_VERSION = 1.0.0
```

获取环境变量，通过`process.env`，在index.js文件中输出：`console.log(process.env)`，可以看到：

```javascript
NODE_ENV: "development" // 内建变量：表示开发环境
PUBLIC_URL: ""
REACT_APP_NAME: "hello" // 自定义变量
REACT_APP_VERSION: "1.0.0" // 自定义变量
```

**生产环境**

构建打包

```javascript
npm run build // 打包

// 全局安装serve 
npm i -g serve
// 预览
serve -s build // build是目标文件夹
```

可以看到，浏览器控制台中打印出的`process.env`并没有`REACT_APP_NAME`和`REACT_APP_VERSION`两个变量，这是因为并没有在生产环境中配置这两个变量。

- npm run start：启动开发环境
- npm run test：启动测试环境
- npm run build: 启动生产环境


## 结语

React开发系列文章(笔记)到这里就结束了。在软件开发中，一开始的计划被无尽的代码优化所击败，添加了很多可能没什么用的功能，这就是为什么很多关键项目最终未能发布或者很迟才发布，So，不要追求开发完美的软件，不要追求编写完美的代码，我们的世界不完美，程序也一样，专注于高质量的应用，按时交付，这比起完美无瑕但推迟交付的作品，客户更喜欢准时完成但有质量保证的产品。当交付了应用，你总有时间和机会去优化它。