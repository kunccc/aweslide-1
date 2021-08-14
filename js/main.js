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
  }
}
const Editor = {
  init() {
    this.bind()
  },
  bind() {

  }
}
const App = {
  init() {
    [...arguments].forEach(module => module.init())
  }
}
App.init(Setting, Editor)

const loadMarkdown = raw => {
  localStorage.setItem('markdown', raw)
  location.reload()
}
const start = () => {
  let TPL = '# aweslide'
  document.querySelector('.slides').innerHTML = convert(localStorage.getItem('markdown') || TPL)
  Reveal.initialize({
    controls: true,
    progress: true,
    center: true,
    hash: true,
    plugins: [RevealZoom, RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight]
  })
}
start()