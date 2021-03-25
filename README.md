# Web Developer


## npm/yarn 镜像管理
```shell
# 查看镜像地址
$ npm config get registry # npm
$ yarn config get registry # yarn

# npm 设置镜像地址
# npm config set registry <registry>
$ npm config set registry https://registry.npmjs.org/

# yarn 设置镜像地址
# yarn config set registry <registry>
$ yarn config set registry https://registry.npmjs.org/
```

## NPM镜像的管理工具

```shell
# 全局安装
$ npm install -g nrm

# 查看 设置 添加
$ nrm ls
$ nrm use <registry>
$ nrm add <registry> <url>
```

## YARN镜像的管理工具

```shell
# 全局安装
$ npm install -g yrm

# 查看 设置 添加
$ yrm ls
$ yrm use <registry>
$ yrm add <registry> <url>
```

## npm package

- [yrm](https://www.npmjs.com/package/yrm)
- [nrm](https://www.npmjs.com/package/nrm)

## 参考

- [npm/yarn设置淘宝镜像源](https://juejin.cn/post/6844903889087496200)