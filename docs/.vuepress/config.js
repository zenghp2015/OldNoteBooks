module.exports = {
  title: 'Zero',
  description: '一个程序猿的VuePress',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '面试题', items: [
        { text: 'CSS', link: '/interview/css/' },
      ] },
    ]
  },
  markdown: {
    lineNumbers: true
  }
}