import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

// Dictionnaire contexte utilisateur - se remplit au fur et à mesure
const contextUser = reactive({
    user: false,
    name_user: "",
    gouts: {},
    position_user: {}
})

// Rendre accessible partout dans l'app
app.config.globalProperties.$contextUser = contextUser
app.provide('contextUser', contextUser)

app.use(router)
app.mount('#app')
