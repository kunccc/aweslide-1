import {$} from '../libs/selector.js'
import convert from '../libs/convert.js'

const Editor = {
  init() {
    let TPL = '# aweslide'
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
      center: true,
      hash: true,
      plugins: [RevealZoom, RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight]
    })
  }
}

export default Editor