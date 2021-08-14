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

export default convert