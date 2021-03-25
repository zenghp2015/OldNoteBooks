# CSS 面试题

## 画 1px 高的线，不同浏览器的效果一致
```html
<div style="height:1px; overflow: hidden; background: red"><div>
```

## 盒模型
盒模型分为两种：IE 盒模型（怪异盒模型）、W3C 盒模型（标准盒模型）
盒模型是由 内容(content)、填充（padding）、边界（margin）、边框（border）组成
而 IE 盒模型的内容区域包括 border 和 padding
可以使用`box-sizing: border-box`设置成IE盒模型


## CSS 清除浮动的几种方法

- 在浮动元素下再放一个标签，使用 `clear:both` 清除浮动

```html
<ul>
  <li>11</li>
  <li>22</li>
  <li>33</li>
  <span></span>
</ul>

<style>
  ul {
    background: yellow;
  }
  li {
    background: red;
    float: left;
    width: 100px;
    height: 100px;
    margin: 10px;
  }
  span{
    clear: both;
    display: block;
    height: 0;
    visibility: hidden;
  }
</style>
```

- 创建格式化上下文（BFC）

```html
<ul>
  <li>11</li>
  <li>22</li>
  <li>33</li>
</ul>

<style>
ul {
  background: yellow;
  overflow: hidden;
  float: left;
  /* position: fixed; */
  /* position: absolute; */
  /* display: inline-block; */
  /* display: table-cell; */
  /* display: table-caption; */
  /* overflow: hidden; */
  /* overflow: scroll; */
  /* overflow: auto; */
}

li {
  background: red;
  float: left;
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: 10px;
}
</style>
```

- 添加`::after`伪元素

```html
<ul class="clearfix">
  <li>11</li>
  <li>22</li>
  <li>33</li>
</ul>
<style>
  li {
    background: red;
    float: left;
    width: 100px;
    height: 100px;
    margin: 10px;
  }

  ul {
    background: yellow;
  }

  /* 添加伪元素 */
  .clearfix::after {
    content: "";
    height: 0;
    display: block;
    clear: both;
  }
</style>
```

## 如何隐藏元素
```css
div {
  /* 设置透明度 占用空间*/
  opacity: 0;

  /* 隐藏 占用空间*/
  visibility: hidden;

  /* 定位：设置top left 为负值 占用空间*/
  position: absolute; /* flexd */
  top: -99999px;
  left: -99999px;

  /* 隐藏 不占用空间 */
  display: none;
}
```

## link 和 @import 的区别
- link 是标签，没有兼容性，页面加载时会同步加载，可以用 js 来操作
- @import 是 css 的用来导入样式表的，只有在 CSS 加载完后才会引用其他CSS, IE5+ 才能识别

## 伪类与伪元素的区别
- 伪类使用单冒号 `:`，伪元素使用双冒号 `::`
- 伪类是用于已存在的元素，在某种状态时为其添加样式，比如：`:link` `:hover` `:active`
- 伪元素是用于创建一些不存在DOM中的元素并为其添加样式， 如 `::after` `::before`

## CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？ CSS3 新增伪类有那些？
```
1.id选择器（ # myid）
2.类选择器（.myclassname）
3.标签选择器（div, h1, p）
4.相邻选择器（h1 + p）
5.子选择器（ul < li）
6.后代选择器（li a）
7.通配符选择器（ * ）
8.属性选择器（a[rel = "external"]）
9.伪类选择器（a: hover, li: nth - child）

* 可继承： font-size font-family color, UL LI DL DD DT;
* 不可继承 ：border padding margin width height ;
* 优先级就近原则，样式定义最近者为准;
* 载入样式以最后载入的定位为准;

优先级为:
  !important >  id > class > tag  
  important 比 内联优先级高

CSS3新增伪类举例：
  p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
  p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
  p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
  p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素。
  p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。
  :enabled、:disabled 控制表单控件的禁用状态。
  :checked，单选框或复选框被选中。
```

##  行内元素和块级元素的具体区别是什么？行内元素的 padding 和 margin 可设置吗？
- 块级元素(block)特性：

总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示;
宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;

- 内联元素(inline)特性：
和相邻的内联元素在同一行;
width\height\padding-top\padding-bottom\margin-top\maring-bottom都不可变

- 默认 inline-block 的元素
`<input>` 、`<img>` 、`<button>` 、`<texterea>`、`<label>`。

## 什么是外边距重叠？重叠的结果是什么？

外边距重叠就是 margin-collapse。

在 CSS 当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。

折叠结果遵循下列计算规则：
1. 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
2. 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
3. 两个外边距一正一负时，折叠结果是两者的相加的和。

## rgba()和 opacity 的透明效果有什么不同？
`rgba()` 和 `opacity` 都能实现透明效果，但最大的不同是 opacity 作用于元素，以及元素内的所有内容的透明度，
而 `rgba()` 只作用于元素的颜色或其背景色