# 动漫岛Web端项目

## 项目简介

本项目采用 [Vue 3](https://vuejs.org/) + [Vite 3](https://vitejs.dev/) 进行开发, 适用于局域网的动漫网站.

- 后台管理端地址: [https://github.com/fzcoder/animeisland-admin](https://github.com/fzcoder/animeisland-admin)
- 服务端地址: [https://github.com/fzcoder/animeisland-server](https://github.com/fzcoder/animeisland-server)

## 如何启动项目(开发模式)?

### 1.克隆本项目

```shell
git clone git@github.com:fzcoder/animeisland-web.git
```

### 2.安装依赖

```shell
yarn
```

### 3.修改配置信息

在项目根路径下`env.development`和`env.production`文件中修改以下内容:

```
VITE_APP_BASE_URL={your_server_url}
```

### 4.启动项目

```shell
yarn dev
```

## 如何进行打包?

```shell
yarn build
```

执行完成后产物位于项目根路径下`dist/`文件夹中