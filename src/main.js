import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

import './assets/style/global.css';

import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';

import App from './App.vue';
import router from './router';

import Http from '@/utils/Http';

const app = createApp(App);
app.config.globalProperties.$Http = Http;
app.config.globalProperties.$Message = ElMessage;
app.config.globalProperties.$Loading = ElLoading;
// 给 vue 实例挂载内部对象
app.config.globalProperties.$XModal = VXETable.modal;
app.config.globalProperties.$XPrint = VXETable.print;
app.config.globalProperties.$XSaveFile = VXETable.saveFile;
app.config.globalProperties.$XReadFile = VXETable.readFile;

app.use(ElementPlus);
app.use(VXETable, { zIndex: 3000 });
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
