import {$, $$} from '../libs/selector.js'

const Setting = {
  init() {
    this.$settingIcon = $('.icon-setting')
    this.$sidebar = $('.sidebar')
    this.$closeIcon = $('.icon-close')
    this.$content = $('.content')
    this.$$tabs = $$('li span')
    this.$$contents = $$('.content')
    this.bind()
  },
  bind() {
    this.$settingIcon.onclick = () => {
      this.$sidebar.classList.add('active')
      this.$content.classList.add('active')
    }
    this.$closeIcon.onclick = () => {
      this.$sidebar.classList.remove('active')
      this.$$contents.forEach($content => $content.classList.remove('active'))
      this.$$tabs.forEach($tab => $tab.classList.remove('active'))
      this.$$tabs[0].classList.add('active')
    }
    this.$$tabs.forEach($tab => $tab.onclick = () => {
      this.$$tabs.forEach($node => $node.classList.remove('active'))
      $tab.classList.add('active')
      const index = [...this.$$tabs].indexOf($tab)
      this.$$contents.forEach($content => $content.classList.remove('active'))
      this.$$contents[index]?.classList.add('active')
    })
  },
}

export default Setting