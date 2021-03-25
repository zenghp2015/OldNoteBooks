const Path = require('path')
const vuepress = require('vuepress')
const compressing = require('compressing')
const dayjs = require('dayjs')
const { NodeSSH } = require('node-ssh')
const dotenv = require('dotenv');


class Deploy {
  constructor(options) {
    this.extname = '.zip'
    this.rootPath = process.cwd();
    this.destPath = Path.resolve(this.rootPath, 'dist')
    this.packageName = dayjs(new Date()).format('YYYYMMDD_HHmmss') + this.extname
    this.packagePath = Path.resolve(this.rootPath, 'storege', this.packageName)
    this.wwwroot = '/www/wwwroot/zhifou.info'
    this.home = '/home/www'
    this.env = dotenv.config().parsed
  }

  async start() {
    await this.build()
    await this.pack()
    await this.upload()
  }

  async build(options){
    const app = vuepress.createApp({
      sourceDir: Path.resolve(this.rootPath, 'docs'),
      dest: Path.resolve(this.rootPath, 'dist'),
      theme: '@vuepress/theme-default',
      siteConfig: {
        title: 'Zero',
        description: '哈哈'
      }
    })
    await app.process()
    return app.build()
  }

  pack() { 
    compressing.zip.compressDir(this.destPath, this.packagePath);
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
    const connect = await this.connect()
    await connect.putFile(this.packagePath, this.packageName)
    await connect.execCommand(`cp ${this.packageName} ${this.wwwroot} && cd ${this.wwwroot} && unzip -o ${this.packageName}`)
    process.exit(0)
  }
}

const deploy = new Deploy({
  sourceDir: 'docs',
  dest: 'dist',
  theme: '@vuepress/theme-default',
  siteConfig: {},
  wwwroot: '/www/wwwroot/zhifou.info',
  home: '/home/www'
})
deploy.start()