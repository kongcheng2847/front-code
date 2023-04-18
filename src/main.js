import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css';

import './assets/style/global.css';

import App from './App.vue';
import router from './router';

import Http from '@/utils/Http';

const app = createApp(App);
app.config.globalProperties.$Http = Http;
app.config.globalProperties.$Message = ElMessage;
app.config.globalProperties.$Loading = ElLoading;

app.use(ElementPlus);
app.use(router);

app.mount('#app');
