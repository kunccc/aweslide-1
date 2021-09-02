import {$} from '../libs/selector.js'
import convert from '../libs/convert.js'

const Editor = {
  init() {
    let TPL = `# AWE SLIDE

## 极简的 Markdown 幻灯片

## 帮助您快速制作简单 PPT 的小能手 😊

## 支持代码 👇
note: 我是笔记
###
\`\`\` javascript
  Hello World
\`\`\`

## 支持图片 👇
### ![dog.jpg](https://lc-gluttony.s3.amazonaws.com/67zWHI3L2bP1/Dl0Hb06MYfWbeoR5aBbzGmuFxOfl7G1h/dog.jpg)

## 支持 PDF 下载和演讲者模式

## 鼠标移至上方点击设置开始使用吧 😎`
    this.$saveBtn = $('.saveMd')
    this.$editor = $('.content textarea')
    this.$sildes = $('.slides')
    this.$markdown = localStorage.markdown || TPL
    this.bind()
    this.start()
  },
  bind() {
    this.$saveBtn.onclick = () => {
      localStorage.markdown = this.$editor.value
      location.reload()
    }
  },
  start() {
    this.$sildes.innerHTML = convert(this.$markdown)
    this.$editor.value = this.$markdown
    Reveal.initialize({
      controls: true,
      progress: true,
      center: localStorage.alignment !== 'top-left',
      hash: true,
      transition: localStorage.transition || 'slide',
      plugins: [RevealZoom, RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight]
    })
  }
}

export default Editor