import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/input.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faCartShopping)
const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')