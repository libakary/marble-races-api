import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(router);
import DateFormat from '@voidsolutions/vue-dateformat'
app.use(DateFormat);


app.mount('#app');
