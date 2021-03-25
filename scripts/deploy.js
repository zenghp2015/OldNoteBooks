const Path = require('path')
const vuepress = require('vuepress')
const compressing = require('compressing')
const dayjs = require('dayjs')
const { NodeSSH } = require('node-ssh')
const dotenv = require('dotenv').config();

const resolve = name => Path.resolve(process.cwd(), name)


class Deploy {
  constructor(options) {
    this.config = {
      sourceDir: resolve('docs'),
      dest: resolve('dist'),
      theme: '@vuepress/theme-default',
      siteConfig: {},
      package: {
        extname: '.zip',
        name: '',
        path: resolve('storege')
      },
      packagePath: resolve('storege'),
      ...options
    }
  }

  async start() {
    await this.build()
    await this.pack()
    await this.upload()
  }

  async build(options) {
    const app = vuepress.createApp({
      sourceDir: this.config.sourceDir,
      dest: this.config.dest,
      theme: this.config.theme,
      siteConfig: this.config.siteConfig
    })

    await app.process()
    return app.build()
  }

  pack() {
    console.log('-- 开始打包 -- ')
    const config = this.config.package;
    const name = config.name ? config.name : this.randomNames();
    this.packagePath = `${config.path}/${name}${config.extname}`

    compressing.zip.compressDir(this.config.dest, this.packagePath);
    console.log('-- 打包完成 -- \n', `package: ${this.packagePath}`)
  }

  connect() {
    let ssh = new NodeSSH();
    return ssh.connect({
      host: process.env.SSH_HOST,
      username: process.env.SSH_USERNAME,
      password: process.env.SSH_PASSWORD,
      port: process.env.SSH_PORT
    })
  }

  async upload() {
    console.log('-- 开始上传 -- ')
    const wwwroot = process.env.SERVE_WWWROOT
    const basename = Path.basename(this.packagePath);
    const connect = await this.connect()

    await connect.putFile(this.packagePath, basename)
    await connect.execCommand(`unzip -o ${basename} -d ${wwwroot}`)
    console.log('-- 上传结束 -- ')
    process.exit(0)
  }
  randomNames(fmt = 'YYYYMMDD_HHmmss') {
    return dayjs(new Date()).format(fmt);
  }
}

const deploy = new Deploy({
  siteConfig: require('../docs/.vuepress/config'),
})
deploy.start()