- [Login 表单组件](#Login表单组件)

# [表单](#表单)

> ctrl + shift + p 然后输入 wrap 回车，然后输入标签，就可以包裹选中的标签，可以使用 emmet 语法

几乎每一个应用程序都会有表单提交功能，所以表单也是很重要的一部分，这章节来看看在 react 中如何使用表单。

## [Login 表单组件](#Login表单组件)

```javascript
import React, { Component } from "react";

class LoginForm extends Component {
  // 阻止表单默认提交行为
  handleSubmit = e => {
    e.preventDefault();
    console.log(e);
  };
  render() {
    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
```

## (Refs 获取 DOM 节点)[#Refs 获取 DOM 节点]

在传统的 DOM 操作时代，获取 input 输入框的值是：`document.getElementById('username').value`，通过获取 DOM 元素，然后获取对应的值，在 react 中，我们不使用 document 对象，因为在 react 的所有观点中，建立了高于 DOM 的抽象全局观，不去操作 DOM，让程序更好管理，也更好的进行单元测试，但是如果真的需要获取一个 DOM 节点对象呢？在 react 中有一种方法：

```javascript
import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();
  componentDidMount() {
    // 通过this.username.current可以获得对应的DOM节点
    this.username.current.focus();
  }
  render() {
    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            ref={this.username}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Email"
          />
        </div>
      </div>
    );
  }
}
export default LoginForm;
```

## [受控元素—获取表单的输入](#受控元素—获取表单的输入)

在创建表单时，很多表单的值都是从服务器获取的（表单回显），之前讲过受控组件：`受控组件没有自己的state，它是通过props获取数据，在数据改变时发起事件`，受控元素也是一样的，像是 input 元素，它有自己的 value 属性，可以获得用户输入的值，如果我们想让 input 的值和 react 中的 state 同步，这应该怎么做呢？

- 首先，把 input 的 value 设置为 state 的属性的引用：

```javascript
import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();
  state = {
    formData: {
      username: ""
    }
  };
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          value={this.state.formData.username}
          ref={this.username}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Email"
        />
      </div>
    );
  }
}
export default LoginForm;
```

看上面代码，设置好后，在页面上的输入框输入会发现，输入框输入不进去东西了，这是因为：`当下state的username是一个空字符串，我们把空字符串绑定在了input的value，state的username就总是显示空字符串了`，为了解决这个问题，就需要在 input 在 change 事件时获得输入的值，然后更新 state 的 username，state 的更新会触发组件的重新渲染，因为绑定了 input 的 value，所以 input 的 value 也跟着更新了。具体代码如下：

```javascript
import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();
  state = {
    formData: {
      username: ""
    }
  };
  handleChange = e => {
    let formData = { ...this.state.formData };
    formData.username = e.currentTarget.value;
    this.setState({ formData });
  };
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          value={this.state.formData.username}
          ref={this.username}
          onChange={this.handleChange}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Email"
        />
      </div>
    );
  }
}
export default LoginForm;
```

### 处理多个输入

上面的代码只是处理了单个输入，如果有多个输入怎么办？那就要通过设定元素的name属性，然后动态的设置state的属性：

```javascript
import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();
  state = {
    formData: {
      username: "",
      password: ""
    }
  };
  componentDidMount() {
    this.username.current.focus();
  }
  // 阻止表单默认提交行为
  handleSubmit = e => {
    console.log(this.username.current.value);
    e.preventDefault();
  };
  handleChange = ({currentTarget: input}) => {
    let formData = { ...this.state.formData };
    formData[input.name] = input.value;
    this.setState({ formData });
  };
  render() {
    const {formData} = this.state
    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              value={formData.username}
              ref={this.username}
              onChange={this.handleChange}
              name="username"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              value={formData.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
```

### [常见错误](#常见错误)

让我们看看上面的代码，如果把state的formData的username属性删掉，运行看看，发现没有报错，但是，在username输入框输入后，发现警告：`组件正在更改要控制的文本类型的非受控输入。输入元素不应该从非受控切换到受控(反之亦然)。决定在组件的生命周期中使用受控或非受控输入元素`。可能有点看不懂，就是当我们删掉了username属性，当试图访问formData的username时，会得到undefined，undefined和null都不能用于受控元素，换句话说，当input的value设置为undefined或者null时，react就不会将其看做一个受控元素，不是受控元素它就会有自己的state或者value，当我们输入第一个字符，因为我们在监听change事件，并更新state，更新了formData，那现在formData的有了username属性，并设置为输入的字符，然后又触发重新渲染，重新渲染时，我们把刚更新的formData的username传给了value，所以引发了警告，这样就形成了我们刚开始创建的是不可控元素，然后又想以可控元素的方式操作它。这就是react给出警告的原因。如果没有删除username，但是username的值是null，那么就会一开始就报警告，因为input的value不能是null。建议以空字符串来清空受控组件或者以undefined来清空不受控组件。所以，在创建表单的时候，当创建state对象中的属性时，要么用空字符串，要么使用正确的值。 


## [封装一个复用的input组件](#封装一个复用的input组件)

```javascript
// Input.jsx
import React from "react";

const Input = ({name, label, value, placeholder="placeholder", onChange}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
        className="form-control"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
```

使用

```javascript
<Input
  value={formData.password}
  name="password"
  label="Password"
  onChange={this.handleChange}
/>
```

### [验证输入(Validation)](#验证输入(Validation))

几乎每个表单都会有输入验证功能，触发的时机可以是点击提交的时候、输入的时候、或者是失去焦点的时候，现在来看看如何校验输入。

**一个简单的验证器**

```javascript
  validate = () => {
    let errors = {};
    const { formData } = this.state;
    if (formData.username.trim() === "")
      errors.username = "username is required";
    if (formData.password.trim() === "")
      errors.password = "password is required";
    
    return Object.keys(errors).length === 0 ? null : errors
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
  };
```

**显示验证错误信息**

```javascript
// Input.jsx
import React from "react";

const Input = ({
  name,
  label,
  value,
  placeholder = "placeholder",
  error,
  onChange
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
        className="form-control"
        placeholder={placeholder}
      />
      {/* 只有在有错误的时候显示 */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
```

```javascript
// loginForm.jsx
import React, { Component } from "react";
import Input from "./common/Input";

class LoginForm extends Component {
  username = React.createRef();
  state = {
    formData: {
      username: "",
      password: ""
    },
    errors: {}
  };
  validate = () => {
    let errors = {};
    const { formData } = this.state;
    if (formData.username.trim() === "")
      errors.username = "username is required";
    if (formData.password.trim() === "")
      errors.password = "password is required";
    return Object.keys(errors).length === 0 ? null : errors
  };
  handleSubmit = e => {
    // 阻止表单默认提交行为
    e.preventDefault();
    const errors = this.validate();
    this.setState({errors: errors || {}})
  };
  handleChange = ({ currentTarget: input }) => {
    let formData = { ...this.state.formData };
    formData[input.name] = input.value;
    this.setState({ formData });
  };
  render() {
    const { formData, errors } = this.state;
    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={formData.username}
            name="username"
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            value={formData.password}
            name="password"
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
```

### [值变化时验证输入](#值变化时验证输入)

上面我们讲了在表单提交时验证输入，现在来看看在输入时如何验证，输入验证和提交时验证的套路很类似，只需要在onchange事件里验证就好，但是不是调用validate验证器，因为调用这个验证器会验证整个表单，只想要显示用户当前输入的验证错误，而不是整个表单。所以我们需要创建另一个验证器，传入当前的输入，返回当前的输入的验证结果：

```javascript
// 单个输入验证器
validateProperty = ({ name, value }) => {
  if (name === "username") {
    if (value.trim() === "") {
      return "Username is required";
    }
  } else if (name === "password") {
    if (value.trim() === "") {
      return "Password is required";
    }
  }
};

// onchange事件
handleChange = ({ currentTarget: input }) => {
  const errors = { ...this.state.errors };
  const errorMessage = this.validateProperty(input);
  if (errorMessage) errors[input.name] = errorMessage;
  else delete errors[input.name];

  let formData = { ...this.state.formData };
  formData[input.name] = input.value;
  this.setState({ formData, errors });
};
```

上面的验证显然是很简陋的，这里只是让你明白一个表单验证的实现过程，在工作中，可以使用第三方库来校验输入。

## [Joi验证库](#Joi验证库)

> 注意的是，joi验证库现在已经被废弃了，取而代之是@hapi/joi，并且支持浏览器使用

**安装**

```javascript
npm i @hapi/joi
```

**使用**

```javascript
schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})
validate = () => {
  const result = this.schema.validate(this.state.formData, {abortEarly: false})
  console.log(result)
}
```

默认情况，joi一旦有一个验证不通过就会停止往下验证，这就是所谓的提前中止，那这样的话，对于整个表单的验证显然是不行的，可以设置一个参数: `{abortEarly: false}`。

### [使用joi验证表单](#使用joi验证表单)

使用joi验证返回的结果，如果有错，则返回value和error对象，如果没有错误，只返回value对象，error对象有个detail属性，是验证错误的详情，现在需要把detail里的信息映射到state里的errors属性里：

```javascript
rules = {
  username: Joi.string().required().label("Username"),
  password: Joi.string().required().label("Password")
};
schema = Joi.object(this.rules);

// 重构整个表单validate验证器
validate = () => {
  const result = this.schema.validate(this.state.formData, {
    abortEarly: false
  });
  if (!result.error) return null;

  const errors = {};
  result.error.details.forEach(item => {
    errors[item.path[0]] = item.message;
  });
  return errors
};

// 重构单个validateProperty验证器
validateProperty = ({ name, value }) => {
  // [name]表示动态key
  const obj = { [name]: value };
  const schema = Joi.object({ [name]: this.rules[name] });
  const { error } = schema.validate(obj);
  return error ? error.message : null;
};
```