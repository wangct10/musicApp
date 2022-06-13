import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins'
// 先建立vue对象
const app = createApp(App)
// 渲染好vant
getVant(app)
// 调用仓库
app.use(store)
// 最后再挂载
app.use(router).mount('#app')


