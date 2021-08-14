const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
const isMain = str => (/^#{1,2}(?!#)/).test(str)
const isSub = str => (/^#{3}(?!#)/).test(str)
const convert = raw => {
  const arr = raw.split(/\n(?=\s*#)/).filter(i => i !== '').map(i => i.trim())
  let html = ''
  for (let i = 0; i < arr.length; i++) {
    if (isMain(arr[i]) && isMain(arr[i + 1])) {
      html += `
          <section data-markdown>
            <textarea data-template>
              ${arr[i]}
            </textarea>
          </section>
        `
    } else if (isMain(arr[i]) && isSub(arr[i + 1])) {
      html += `
          <section>
            <section data-markdown>
              <textarea data-template>
                ${arr[i]}
              </textarea>
            </section>
        `
    } else if (isSub(arr[i]) && isSub(arr[i + 1])) {
      html += `
          <section data-markdown>
            <textarea data-template>
              ${arr[i]}
            </textarea>
          </section>
        `
    } else if (isSub(arr[i]) && isMain(arr[i + 1])) {
      html += `
            <section data-markdown>
              <textarea data-template>
                ${arr[i]}
              </textarea>
            </section>
          </section>
        `
    } else if (!arr[i + 1]) {
      if (isMain(arr[i])) {
        html += `
            <section data-markdown>
              <textarea data-template>
                ${arr[i]}
              </textarea>
            </section>
          `
      } else if (isSub(arr[i])) {
        html += `
              <section data-markdown>
                <textarea data-template>
                  ${arr[i]}
                </textarea>
              </section>
            </section>
          `
      }
    }
  }
  return html
}

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
const App = {
  init() {
    [...arguments].forEach(module => module.init())
  }
}
App.init(Setting, Editor, Theme)