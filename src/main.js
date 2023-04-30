import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import Button from "primevue/button"
import Sidebar from 'primevue/sidebar';
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';

const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.use(ToastService);
app.component('Spinner', ProgressSpinner)
app.component('Toast', Toast)
app.component('Button', Button)
app.component('Sidebar', Sidebar)

app.mount('#app')