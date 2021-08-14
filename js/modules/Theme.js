import {$} from '../libs/selector.js'

const Theme = {
  init() {
    this.themes = ['blood', 'beige', 'black', 'league', 'moon', 'night', 'serif', 'simple', 'sky', 'solarized', 'white']
    this.currentTheme = localStorage.theme || 'blood'
    this.currentIndex = this.themes.indexOf(this.currentTheme)
    this.$theme = $('.theme')
    this.$saveBtn = $('.saveTheme')
    this.bind()
    this.setTheme()
    this.loadSwiper()
  },
  bind() {
    this.$saveBtn.onclick = () => {
      localStorage.theme = this.currentTheme
      location.reload()
    }
  },
  setTheme() {
    const $link = document.createElement('link')
    $link.rel = 'stylesheet'
    $link.href = `css/theme/${this.currentTheme}.css`
    document.head.appendChild($link)
  },
  loadSwiper() {
    const {currentIndex} = this
    const swiper = new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 4,
        slideShadows: false,
      },
      on: {
        init() {
          this.activeIndex = currentIndex
        },
      },
    })
    swiper.on('slideChange', e => {
      this.currentTheme = this.themes[e.activeIndex]
      this.$theme.innerText = this.currentTheme
    })
    this.$theme.innerText = this.currentTheme
  }
}

export default Theme