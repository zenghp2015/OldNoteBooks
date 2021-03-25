# Web Developer

## 环境配置

- `.env.default` 默认配置文件
- `.env.prod` 生产环境配置文件

```shell
# SSH 配置
SSH_HOST = 127.0.0.1
SSH_USERNAME = sftp
SSH_PASSWORD = sftp123
SSH_PORT = 10086

# 网站目录
SERVE_WWWROOT = /home/www/wwwroot
```


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


---

## NPM Package

### 压缩和解压缩
- [compressing](https://www.npmjs.com/package/compressing)

### SSH
- [node-ssh](https://www.npmjs.com/package/node-ssh)