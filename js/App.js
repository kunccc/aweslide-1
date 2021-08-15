import Theme from './modules/Theme.js'
import Setting from './modules/Setting.js'
import Editor from './modules/Editor.js'
import Print from './modules/Print.js'

const App = {
  init() {
    [...arguments].forEach(module => module.init())
  }
}
App.init(Theme, Setting, Editor, Print)