## Taro + vue3 项目模版

taro版本`3.5.8`，目前支持微信、支付宝、抖音、快手、百度小程序；支持H5；微信外的小程序需要添加命令行和`project`配置

### 启动项目

启动方式分为下面三种方式

- `yarn watch:xx`: 开发环境地址`uat`、体验版环境`uat`、正式版环境`real`
- `yarn dev:xx`: 根据node环境变量`API_URL`或` process.env.API_ENV`改变请求环境/域名
- `yarn build:xx`: 体验版环境`uat`、正式版环境`real`

可以通过创建`.env`文件，设置`API_URL`环境变量来强制修改当前请求的环境，或者通过命令行`cross-env`设置

```t
# .env文件
API_URL='https://xxx.lexing.com'
```

### 目录结构

```t
├── config/                    # taro 构建配置
├── types/                     # 全局TS类型
├── src
│   ├── api                    # 全局请求
│   ├── components             # 公共组件和业务组件
│   ├── contanst               # 公共枚举
│   ├── hooks                  # hooks函数
│   ├── iconfont               # 目前仅支持手动修改
│   ├── store                  # 全局数据管理，目前主要为用户信息、全局loading和error信息
│   ├── cache.ts               # 持久缓存
│   ├── events.ts              # 事件中心，如处理刷新第三方页面数据
│   ├── utils                  # 主要的方法库，请求、方法库、小程序平台方法的封装
│   ├── pages                  # 业务页面
│   ├── app.config.js          # 路由配置、全局页面配置
│   ├── app.ts                 # 入口文件
│   ├── app.scss               # 全局样式
```

### 主体功能

- 全局数据管理：`pinia`
- 图表库iconfont: 
  - 文件位置`@/iconfont`
  - 替换图表库，需要保留/修改原有图标
    1. `jmc-icon-xiajiantou`、`jmc-icon-youjiantou`内置表单组件箭头
    2. `jmc-icon-loading`全局loaing
    3. `Nodata-pana_fuzh`错误页面图标
- 持久缓存管理： `cache from '@/cache'`, 额外使用须自定义TS和方法
- hooks：
  - [`taro-hooks`](https://next-taro-hooks.pages.dev/site/hooks/intro), 部分hooks存在bug
  - `@/hooks`：自定义hooks
- UI框架
  1. [NutUI-Vue 组件](https://nutui.jd.com/h5/vue/4x/#/zh-CN/guide/intro)
  2. [@jmcteam/nutui](https://jmcteam.github.io/nutui/#/introduce)
- 异常捕获和埋点：[@antmjs/trace](https://github.com/AntmJS/antm/blob/main/packages/trace)
  - 上报信息：`@/trace`下已定义好初始化方法和上报阿里云存储的示例
  - 事件埋点： `data-click-id`定义事件埋点，复杂埋点通过`exposure`投放
- 支持JSX: 
  - `tsx`的组件写法，省略组件注册、更便捷的遍历渲染和条件渲染
  - `emit`需要在`setup`的第二个回调参数中使用emit
  - `slot`需要`setup`的第二个回调参数中使用slot['default/xx']和taroComponents下面的Slot搭配使用
  - 建议简单的`slot`都采用`JSX`的方式传入
- 内置组件：
  - `container`: 页面公共容器1
  - `titleBar`: 自定义头部标题

### 代码模板

输入提示词`apage`

### commit规范

```bash
# "feat"          新功能（feature）
# "fix"           修补bug
# "style"         格式（不影响代码运行的变动）
# "chore"         构建过程或辅助工具的变动
# "typings"       Typescript 类型错误
# "docs"          文档（documentation）
# "refactor"      重构（既不是新增功能，也不是修改bug的代码变动）
# "test"          增加或修改测试用例
git commit -m 'feat: xxxxx'
# 或者快捷方式commit
npx cz
```