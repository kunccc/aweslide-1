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
      }).then(file => this.insertText(`![${localFile.name}](${file.attributes.url})`), err => console.log(err))
    }
  },
  start() {
    AV.init({
      appId: '67zWHI3L2bP1LVtCLTyY8EDY-MdYXbMMI',
      appKey: 'z4Xgqy6vO7jIuymesOz3dGuL',
      serverURL: 'https://67zwhi3l.engine.lncldglobal.com'
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