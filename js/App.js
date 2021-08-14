import Setting from './modules/Setting.js'
import Editor from './modules/Editor.js'
import Theme from './modules/Theme.js'

const App = {
  init() {
    [...arguments].forEach(module => module.init())
  }
}
App.init(Setting, Editor, Theme)