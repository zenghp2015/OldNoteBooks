const Path = require('path')
const vuepress = require('vuepress')
const compressing = require('compressing')
const dayjs = require('dayjs')
const { NodeSSH } = require('node-ssh')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (...args) => Path.resolve(process.cwd(), ...args)


class Deploy {
  constructor(options = {}) {
    this.config = {
      sourceDir: 'docs',
      dest: 'dist',
      theme: '@vuepress/theme-default',
      siteConfig: '.vuepress/config.js',
      package: {
        extname: '.zip',
        name: '',
        path: 'storege'
      },
      ...options
    }
  }

  async start() {
    const env = isProd ? '.env.prod' : '.env.default'
    require('dotenv').config({ path: resolve(env) })

    await this.build({
      sourceDir: resolve(this.config.sourceDir),
      dest: resolve(this.config.dest),
      theme: this.config.theme,
      siteConfig: require(resolve(this.config.sourceDir, this.config.siteConfig))
    })
    await this.pack()
    await this.upload()
  }

  async build(options) {
    const app = vuepress.createApp(options)
    await app.process()
    return app.build()
  }

  pack() {
    console.log('> 开始打包... ')
    const config = this.config.package;
    const name = config.name ? config.name : this.randomNames();
    const path = resolve(config.path)
    this.packagePath = `${path}/${name}${config.extname}`

    compressing.zip.compressDir(this.config.dest, this.packagePath);
    console.log('> 打包完成 -- \n', `package: ${this.packagePath}`)
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
    console.log('> 开始部署... ')
    const wwwroot = process.env.SERVE_WWWROOT
    const basename = Path.basename(this.packagePath);
    const connect = await this.connect()

    await connect.putFile(this.packagePath, basename)
    await connect.execCommand(`unzip -o ${basename} -d ${wwwroot}`)
    console.log('> 部署结束')
    process.exit(0)
  }
  randomNames(fmt = 'YYYYMMDD_HHmmss') {
    return dayjs(new Date()).format(fmt);
  }
}

const deploy = new Deploy()
deploy.start()