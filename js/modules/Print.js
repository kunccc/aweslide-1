import {$} from '../libs/selector.js'

const Print = {
  init() {
    this.$print = $('.print')
    this.bind()
    this.start()
  },
  bind() {
    this.$print.onclick = () => {
      this.$print.setAttribute('target', 'blank')
      this.$print.setAttribute('href', location.href + '?print-pdf')
      this.$print.click()
    }
  },
  start() {
    location.href.match(/print-pdf/gi) && setTimeout(() => print(), 1000)
  }
}

export default Print