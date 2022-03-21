import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'element-plus/dist/index.css'
import { ElButton, ElRow, ElCol, ElForm, ElTabs, ElTabPane, ElDivider, ElUpload, ElIcon,ElDialog ,ElCard} from 'element-plus';
import mainComponent from './pages/main.vue';
import safeComponent from './pages/safe/main.vue'
import searchComponent from './pages/search/main.vue'
const app = createApp(App);
app.use(ElButton)
app.use(ElRow)
app.use(ElCol)
app.use(ElForm)
app.use(ElTabs)
app.use(ElTabPane)
app.use(ElDivider)
app.use(ElUpload)
app.use(ElIcon)
app.use(ElDialog)
app.use(ElCard)

const routes = [
    {
        path: "/",
        name: "main",
        component: mainComponent,
    },
    {
        path: '/safe',
        name: 'safe',
        component: safeComponent
    }, {
        path: '/search',
        name: 'search',
        component: searchComponent
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
app.use(router)
app.mount('#app');
