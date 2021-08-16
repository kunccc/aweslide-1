import {$} from '../libs/selector.js'

const Upload = {
  init() {
    this.$upload = $('#upload')
    this.$textarea = $('textarea')
    this.start()
    this.bind()
  },
  bind() {
    this.$upload.onchange = () => {
      if (this.$upload.files.length <= 0) return
      const localFile = this.$upload.files[0]
      if (localFile.size / 1048576 > 2) {
        alert('文件大小不能超过 2M')
        return
      }
      this.insertText('![上传中，进度0%]()')
      const file = new AV.File(encodeURI(localFile.name), localFile)
      file.save({
        keepFileName: true,
        onprogress: progress => this.insertText(`![上传中，进度${progress.percent}%]()`)
      }).then(file => this.insertText(`![${file.attributes.name}](${file.attributes.url}?imageView2/0/w/800/h/600)`), err => console.log(err))
    }
  },
  start() {
    AV.init({
      appId: 'VOI2I4mOe4nGnN3F2nJuKDhY-gzGzoHsz',
      appKey: 'EeeVYDhbHVG1UFMfh0qyKPCj',
      serverURL: 'https://voi2i4mo.lc-cn-n1-shared.com'
    })
  },
  insertText(text) {
    const start = this.$textarea.selectionStart
    const end = this.$textarea.selectionEnd
    const oldText = this.$textarea.value
    this.$textarea.value = `${oldText.substring(0, start)}${text}${oldText.substring(end)}`
    this.$textarea.focus()
    this.$textarea.setSelectionRange(start, start + text.length)
  }
}

export default Upload