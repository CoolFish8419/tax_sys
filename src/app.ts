import { createApp } from 'vue'
import './app.scss'
import '@nutui/touch-emulator'
import axios from 'axios';
import myNavbar from './compoment/navbar'
axios.defaults.baseURL = 'http://101.200.32.224:3000'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})


App.config.globalProperties.$http = axios

export default App
