import {$, $$} from '../libs/selector.js'

const Theme = {
  init() {
    this.themes = ['blood', 'beige', 'black', 'league', 'moon', 'night', 'serif', 'simple', 'sky', 'solarized', 'white']
    this.transitions = {
      slide: '滑动',
      fade: '淡化',
      convex: '凸出',
      concave: '凹陷',
      zoom: '缩放',
      none: '无'
    }
    this.alignments = {
      center: '居中',
      'top-left': '左上'
    }
    this.currentTheme = localStorage.theme || 'blood'
    this.currentIndex = this.themes.indexOf(this.currentTheme)
    this.currentTransition = localStorage.transition || 'slide'
    this.currentAlignment = localStorage.alignment || 'center'
    this.$theme = $('.theme')
    this.$saveBtn = $('.saveTheme')
    this.$slide = $('.slides')
    this.$settingIcon = $('.icon-setting')
    this.$$dropdown = $$('.default')
    this.$$dropdownLists = $$('.dropdown .list')
    this.$$listItems = $$('.list li')
    this.bind()
    this.setTheme()
    this.loadSwiper()
  },
  bind() {
    this.$saveBtn.onclick = () => {
      localStorage.theme = this.currentTheme
      localStorage.transition = this.currentTransition
      localStorage.alignment = this.currentAlignment
      location.reload()
    }
    this.$$dropdown.forEach($dropdown => $dropdown.onclick = () => {
      // let classList
      // if ([...this.$$dropdown].indexOf($dropdown) === 0) classList = this.$$dropdownLists[0].classList
      // else classList = this.$$dropdownLists[1].classList;
      // [...classList].indexOf('active') >= 0
      //   ? classList.remove('active')
      //   : classList.add('active')

      if ([...this.$$dropdown].indexOf($dropdown) === 0) {
        const currentClassList = this.$$dropdownLists[0].classList;
        [...currentClassList].indexOf('active') >= 0
          ? currentClassList.remove('active')
          : currentClassList.add('active')
        this.$$dropdownLists[1].classList.remove('active')
      } else {
        const currentClassList = this.$$dropdownLists[1].classList;
        [...currentClassList].indexOf('active') >= 0
          ? currentClassList.remove('active')
          : currentClassList.add('active')
        this.$$dropdownLists[0].classList.remove('active')
      }
    })
    this.$$listItems.forEach($listItem => $listItem.onclick = () => {
      this.$$listItems.forEach($listItem => $listItem.classList.remove('selected'))
      $listItem.classList.add('selected')
      if ($listItem.dataset.transition) this.currentTransition = $listItem.dataset.transition
      if ($listItem.dataset.alignment) this.currentAlignment = $listItem.dataset.alignment
      this.$$dropdownLists.forEach($dropdownList => $dropdownList.classList.remove('active'))
      this.$$dropdown[0].innerHTML = `${this.transitions[this.currentTransition]}<i class="iconfont icon-down"></i>`
      this.$$dropdown[1].innerHTML = `${this.alignments[this.currentAlignment]}<i class="iconfont icon-down"></i>`
    })
  },
  setTheme() {
    const $link = document.createElement('link')
    $link.rel = 'stylesheet'
    $link.href = `css/theme/${this.currentTheme}.css`
    document.head.appendChild($link)
    this.$$dropdown[0].innerHTML = `${this.transitions[this.currentTransition]}<i class="iconfont icon-down"></i>`
    this.$$dropdown[1].innerHTML = `${this.alignments[this.currentAlignment]}<i class="iconfont icon-down"></i>`
    if (localStorage.alignment === 'top-left') this.$slide.classList.add('top-left')
    const lightThemes = ['beige', 'serif', 'simple', 'sky', 'solarized', 'white']
    if (lightThemes.indexOf(this.currentTheme) >= 0) this.$settingIcon.classList.add('dark')
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